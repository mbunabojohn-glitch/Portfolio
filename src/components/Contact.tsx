import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── Replace these with your EmailJS credentials ───────────────────────────
// Sign up free at https://www.emailjs.com
// 1. Create a service (Gmail works fine) → copy Service ID
// 2. Create a template with variables: {{from_name}}, {{from_email}}, {{message}}
//    → copy Template ID
const EMAILJS_SERVICE_ID = "service_nk87db8";
const EMAILJS_TEMPLATE_ID = "template_9un0b8a";// ───────────────────────────────────────────────────────────────────────────

const SOCIALS = [
  { label: "GitHub", url: "https://github.com/mbunabojohn-glitch", icon: "github", display: "GitHub" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/mbunabo-john-ab180b229/", icon: "linkedin", display: "LinkedIn" },
  { label: "Email", url: "mailto:mbunabojohn@gmail.com", icon: "email", display: "mbunabojohn@gmail.com" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    try {
      console.log("Sending with:", {
        service: EMAILJS_SERVICE_ID,
        template: EMAILJS_TEMPLATE_ID,
        form,
      });
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: `Portfolio message from ${form.name}`,
        }
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#050505] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-orange-500 font-bold text-xs tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-orange-500" />
            04 / Contact
            <span className="inline-block w-8 h-px bg-orange-500" />
          </p>
          <h2
            className="text-white font-black mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
          >
            Let's Build <span className="text-orange-500">Something</span>
          </h2>
          <p className="text-zinc-500 font-light mb-12 max-w-md mx-auto">
            Open to freelance projects, collaboration, or just a solid tech conversation. Drop me a line.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-left"
        >
          <div className="space-y-4 mb-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-zinc-600 text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white px-4 py-3.5 text-sm font-medium outline-none transition-colors placeholder:text-zinc-700"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-zinc-600 text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white px-4 py-3.5 text-sm font-medium outline-none transition-colors placeholder:text-zinc-700"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-zinc-600 text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell me about the project..."
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white px-4 py-3.5 text-sm font-medium outline-none transition-colors resize-none placeholder:text-zinc-700"
              />
            </div>

            {/* Submit */}
            <motion.button
              onClick={handleSubmit}
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full py-4 font-bold text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
                status === "sent"
                  ? "bg-green-500 text-black"
                  : status === "error"
                  ? "bg-red-500 text-white"
                  : status === "sending"
                  ? "bg-orange-500/60 text-black cursor-wait"
                  : "bg-orange-500 text-black hover:bg-orange-400"
              }`}
            >
              {status === "idle" && "Send Message →"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "✓ Message Sent! I'll reply soon."}
              {status === "error" && "✗ Failed, try emailing me directly"}
            </motion.button>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-8 mt-10">
            {SOCIALS.map(({ label, url, icon, display }) => (
              <a
                key={label}
                href={url}
                target={url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-2"
              >
                {icon === "github" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                )}
                {icon === "linkedin" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                )}
                {icon === "email" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )}
                <span>{display}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
