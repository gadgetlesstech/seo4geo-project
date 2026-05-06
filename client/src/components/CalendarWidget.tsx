interface CalendarWidgetProps {
  onClose: () => void;
}

export default function CalendarWidget({ onClose }: CalendarWidgetProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <button
          onClick={onClose}
          className="mr-4 text-[12px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h3 className="font-display font-black text-[12px] uppercase tracking-widest text-white">
          Schedule Session
        </h3>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border border-white/10">
        <iframe
          src="https://calendly.com/gadgetlesstech/discovery-meeting?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Schedule a discovery meeting"
        />
      </div>
    </div>
  );
}
