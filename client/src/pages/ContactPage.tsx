import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "20 Summer Street, Fourth Floor\nStamford, CT 06901",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "203.296.0995",
    href: "tel:2032960995",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@gadgetlesstech.com",
    href: "mailto:support@gadgetlesstech.com",
  },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/gadgetlesstech" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/gadgetlesstech" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/Gadgetlesstech" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/kevin-rhodes-4906366/" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@gadgetlesstech" },
];

const interests = [
  "Branding",
  "Creative Web Design",
  "Development",
  "SEO",
  "SEM",
  "Content Marketing",
  "Local Marketing",
  "Free Online Visibility Audit",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}%0AInterest: ${interest}%0A%0A${message}`;
    window.location.href = `mailto:support@gadgetlesstech.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSent(true);
  };

  const inputClass =
    "w-full bg-black border border-white/10 rounded-lg px-4 py-4 text-white text-sm font-medium placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors";

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 flex items-center">
            <div className="w-12 h-px bg-cyan-400/30 mr-4" />
            Get In Touch
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase italic leading-[0.9]">
            Contact <span className="text-cyan-400">Us</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl font-medium">
            Ready to grow your search visibility? Reach out and let's talk strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactDetails.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white text-sm font-medium hover:text-cyan-400 transition-colors leading-relaxed whitespace-pre-line">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium leading-relaxed whitespace-pre-line">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-5">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-xs font-bold uppercase tracking-wider"
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="h-full flex items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl text-center">
                <div>
                  <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase tracking-tighter italic text-white mb-3">Message Sent</h3>
                  <p className="text-gray-500 text-sm font-medium">We'll get back to you at support@gadgetlesstech.com</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-2 block">Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-2 block">I'm Interested In</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>Select a service...</option>
                    {interests.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-2 block">Subject *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-2 block">Message</label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00b8db] text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,184,219,0.3)]"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
