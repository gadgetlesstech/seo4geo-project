export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const float32ToInt16 = (float32Array: Float32Array): Int16Array => {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16Array;
};

export const base64ToFloat32 = (base64: string): Float32Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const int16Array = new Int16Array(bytes.buffer);
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 0x8000;
  }
  return float32Array;
};

export class AudioQueue {
  private chunks: Float32Array[] = [];
  private isPlaying = false;
  private audioContext: AudioContext | null = null;
  private nextStartTime = 0;

  constructor(private sampleRate: number = 24000) {}

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: this.sampleRate,
      });
      this.nextStartTime = this.audioContext.currentTime;
    }
  }

  enqueue(chunk: Float32Array) {
    this.initAudioContext();
    this.chunks.push(chunk);
    if (!this.isPlaying) {
      this.playNext();
    }
  }

  private async playNext() {
    if (this.chunks.length === 0 || !this.audioContext) {
      this.isPlaying = false;
      return;
    }
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
    this.isPlaying = true;
    const chunk = this.chunks.shift()!;
    const buffer = this.audioContext.createBuffer(1, chunk.length, this.sampleRate);
    buffer.getChannelData(0).set(chunk);
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    const startTime = Math.max(this.audioContext.currentTime, this.nextStartTime);
    source.start(startTime);
    this.nextStartTime = startTime + buffer.duration;
    source.onended = () => { this.playNext(); };
  }

  stop() {
    this.chunks = [];
    this.isPlaying = false;
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
