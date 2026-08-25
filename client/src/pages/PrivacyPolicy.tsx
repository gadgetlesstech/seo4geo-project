import { motion } from "motion/react";

const sections = [
  {
    title: "Your Privacy",
    body: `Your privacy is important to us. To better protect your privacy, we provide this notice explaining our online information practices and the choices you can make about the way your information is collected and used. You agree to these policies by virtue of using our website in a way that leads to you providing us with personal information.`,
  },
  {
    title: "State Law & Accompanying Rights",
    body: `Please understand that you may have additional rights originating from State laws based on where you live. These State-based rights may augment, strengthen, or otherwise complement any privacy rights you have inherently or under Federal law. Our policy is to comply fully with the privacy policies of every jurisdiction in which we operate. Accordingly, you are free to use our Contact information to reach us at any time to assert any State rights.`,
  },
  {
    title: "Our Commitment To Children's Privacy",
    body: `Protecting the privacy of the very young is especially important. For that reason, SEO4GEO will never collect or maintain information from anyone we actually know is under 18, and no part of the website is structured to attract anyone under 18.\n\nUnder our Terms of Service and Conditions of Use, children under 18 are not allowed to use the website or access our services. It is not our intention to offer products or services to minors.`,
  },
  {
    title: "Google Analytics",
    body: `SEO4GEO uses Google Analytics to help analyze how users use the site. The tool uses cookies to collect standard Internet log information and visitor behavior information. Information generated about use of the website may be transmitted to Google and used to evaluate website activity and compile statistical reports.\n\nYou may refuse cookies through your browser settings, although doing so may limit some website functionality. Google's handling of information is governed by its own applicable terms and privacy practices.`,
  },
  {
    title: "Other Collection of Personal Information",
    body: `When visiting SEO4GEO, the IP address used to access the website may be logged along with dates and times of access. This information may be used to analyze trends, administer the website, understand user movement, gather broad demographic information, and improve the user experience.\n\nOther information may also be collected, including referral source, visit duration, destination pages, operating system, browser type, device information, and similar technical information.\n\nSEO4GEO may use cookies and similar technologies to customize and improve the website experience. You may adjust your browser settings to disable or receive notice of cookies, although refusing cookies may limit some features.\n\nAt times, you will knowingly provide information directly to us. For example, you may provide an email address, complete a form, request SMS communications, submit your website or business information for an analysis or audit, or otherwise provide information to SEO4GEO. Where purchases are offered, payment, billing, address, phone, and related information may also be required. Refusing to provide required information may prevent us from providing requested products or services.\n\nWhere content or features are protected by a username and password, account credentials may be connected to other account information. Usernames and passwords should be kept private.`,
  },
  {
    title: "Handling of Personal Information",
    body: `Any personal information you voluntarily provide to third parties outside SEO4GEO or our service providers may be beyond our control and subject to those third parties' policies.\n\nOur primary purpose for collecting personal information is to operate our business, provide SEO4GEO services, generate requested analyses, improve the service, communicate with users, and better serve you.\n\nInformation may be stored or processed by third-party service providers used to operate SEO4GEO, including hosting, analytics, email, data-processing, and other technology providers. Their handling of information is governed by applicable agreements, terms, and privacy practices.\n\nWe may use aggregated or de-identified information to understand our user base and improve our services. Aggregate information that does not identify individual users may be shared for legitimate business purposes.\n\nWe may disclose information where required by law, legal process, governmental request, or where reasonably necessary to investigate illegal activity, protect rights or safety, enforce our terms, or protect SEO4GEO, Gadgetlesstech LLC, our users, or others.`,
  },
  {
    title: "Advertising Cookies and Third-Party Technologies",
    body: `If third-party advertising services are enabled, advertising vendors may use cookies or similar technologies to serve or measure advertisements based on visits to this website or other websites. Such technologies are governed by the applicable third party's privacy policies and controls.\n\nSEO4GEO may not have access to or control over cookies or similar technologies placed by third-party advertising providers.`,
  },
  {
    title: "Links to Third Party Websites",
    body: `SEO4GEO may include links to third-party websites for your use and reference. We are not responsible for the privacy policies or practices of those websites. Their policies may differ from ours.`,
  },
  {
    title: "Comments and Public Submissions",
    body: `If SEO4GEO provides public commenting or community features, users are expected to participate respectfully and lawfully.\n\nSEO4GEO reserves the right to remove submissions that we consider off-topic, defamatory, abusive, harassing, threatening, offensive, unlawful, infringing, misleading, spam, or otherwise inappropriate.\n\nYou retain ownership of content you submit, but by posting through a public feature you grant SEO4GEO a worldwide, non-exclusive, royalty-free license to store, use, transmit, display, publish, reproduce, and distribute that content in connection with the website and service.`,
  },
  {
    title: "Change Notice",
    body: `This Privacy Policy may change over time to reflect changes to SEO4GEO, applicable law, technology, or business practices. We encourage you to review it periodically.`,
  },
  {
    title: "Copyright Warning",
    body: `Legal notices and administrative pages used for SEO4GEO may contain licensed or protected material. Such material may not be copied, reproduced, or used without authorization.`,
  },
  {
    title: "Questions / Comments / Concerns",
    body: `If you have questions about this Privacy Policy, your information, or the SEO4GEO service, please contact us through the contact information provided on the SEO4GEO website.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-32 bg-black min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 block flex items-center">
            <div className="w-12 h-px bg-cyan-400/30 mr-4" />
            Legal
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase italic leading-[0.9]">
            Privacy <span className="text-cyan-400">Policy</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">SEO4GEO is operated by Gadgetlesstech LLC &mdash; Last updated 2026</p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="border-t border-white/5 pt-10"
            >
              <h2 className="font-display font-black text-white uppercase tracking-tighter text-xl italic mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="text-gray-400 text-sm font-medium leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-600 text-xs font-black uppercase tracking-widest text-center mt-16 pt-10 border-t border-white/5">
          SEO4GEO is operated by Gadgetlesstech LLC.
        </p>
      </div>
    </div>
  );
}
