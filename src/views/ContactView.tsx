import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PipelineVisualizer } from '../components/PipelineVisualizer';
import { playClickSound, playHoverSound } from '../components/Header';
import { Send, Mail, Terminal, ShieldAlert } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      playClickSound();
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    playClickSound();
    setStatus('sending');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          title: form.subject || '(No subject)',
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      });
  };

  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* Title Header */}
        <section className="border-b border-text/10 pb-4">
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
            <Terminal className="text-accent-lime" /> COMMUNICATION_CONSOLE.DAT
          </h2>
          <p className="font-mono text-xs text-text/50 mt-1">
            Establish secure encrypted connection pipelines to the administrator command center.
          </p>
        </section>

        {/* Console split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Column 1: Contact Form (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="bg-secondary/35 border border-text/10 rounded-lg p-5 flex flex-col gap-4 theme-transition">
              <h3 className="font-mono text-xs font-bold text-accent-lime tracking-widest border-b border-text/5 pb-2 mb-1">
                [SECURE_MESSAGE_TRANSMITTER.EXE]
              </h3>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 font-mono text-[10px]">
                  <label className="text-text/50">NAME_ID:</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onMouseEnter={playHoverSound}
                    placeholder="Enter moniker..."
                    className="bg-primary border border-text/10 rounded py-2 px-3 text-text text-xs focus:outline-none focus:border-accent-lime transition-all theme-transition"
                  />
                </div>
                <div className="flex flex-col gap-1 font-mono text-[10px]">
                  <label className="text-text/50">EMAIL_IP:</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onMouseEnter={playHoverSound}
                    placeholder="Enter transmission node..."
                    className="bg-primary border border-text/10 rounded py-2 px-3 text-text text-xs focus:outline-none focus:border-accent-lime transition-all theme-transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1 font-mono text-[10px]">
                <label className="text-text/50">TOPIC_HEADER:</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onMouseEnter={playHoverSound}
                  placeholder="Enter message subject..."
                  className="bg-primary border border-text/10 rounded py-2 px-3 text-text text-xs focus:outline-none focus:border-accent-lime transition-all theme-transition"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1 font-mono text-[10px]">
                <label className="text-text/50">MESSAGE_PAYLOAD:</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onMouseEnter={playHoverSound}
                  rows={4}
                  placeholder="Enter payload content..."
                  className="bg-primary border border-text/10 rounded py-2 px-3 text-text text-xs focus:outline-none focus:border-accent-lime transition-all resize-none theme-transition"
                />
              </div>

              {/* Submit triggers */}
              <div className="flex justify-between items-center mt-2">
                <span className="font-mono text-[8px] text-text/30 flex items-center gap-1">
                  {status === 'error' && <><ShieldAlert size={10} className="text-red-500" /> Validation failed</>}
                  {status === 'idle' && 'READY FOR COMPILATION'}
                </span>
                
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  onMouseEnter={playHoverSound}
                  className={`font-mono text-[10px] px-5 py-2.5 rounded flex items-center gap-1.5 font-bold shadow-md transition-all ${
                    status === 'sending'
                      ? 'bg-text/10 border border-text/20 text-text/45 cursor-not-allowed'
                      : 'bg-accent-lime text-bg-primary hover:bg-accent-lime/85'
                  }`}
                >
                  <Send size={11} />
                  <span>TRANSMIT_PAYLOAD()</span>
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Visualizer & Social Channels */}
          <div className="flex flex-col gap-6">
            {/* Visualizer Pipeline panel */}
            <PipelineVisualizer status={status} />

            {/* Social handles */}
            <div className="bg-secondary/35 border border-text/10 rounded-lg p-5 flex flex-col gap-4 font-mono text-[10px] theme-transition">
              <h3 className="font-mono text-[11px] font-bold text-accent-orange border-b border-text/5 pb-2 mb-1">
                [DIRECT_ADMIN_CORES]
              </h3>
              
              <div className="flex flex-col gap-3.5">
                {/* Email link */}
                <a
                  href="mailto:manas280704@gmail.com"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center justify-between p-2.5 bg-primary/45 border border-text/5 hover:border-accent-lime/30 rounded transition-all"
                >
                  <span className="flex items-center gap-2 text-text/75 hover:text-text">
                    <Mail size={12} className="text-accent-lime" />
                    manas280704@gmail.com
                  </span>
                  <span className="text-[8px] text-text/30">[SMTP]</span>
                </a>

                {/* LinkedIn link */}
                <a
                  href="https://linkedin.com/in/themanaspwr"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center justify-between p-2.5 bg-primary/45 border border-text/5 hover:border-accent-lime/30 rounded transition-all"
                >
                  <span className="flex items-center gap-2 text-text/75 hover:text-text">
                    <svg className="w-3 h-3 fill-current text-accent-lime" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    linkedin.com/in/themanaspwr
                  </span>
                  <span className="text-[8px] text-text/30">[LINK]</span>
                </a>

                {/* GitHub link */}
                <a
                  href="https://github.com/themanaspwr"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center justify-between p-2.5 bg-primary/45 border border-text/5 hover:border-accent-lime/30 rounded transition-all"
                >
                  <span className="flex items-center gap-2 text-text/75 hover:text-text">
                    <svg className="w-3 h-3 fill-current text-accent-lime" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.604-2.665-.3-5.467-1.334-5.467-5.931 0-1.31.469-2.38 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    github.com/themanaspwr
                  </span>
                  <span className="text-[8px] text-text/30">[REPO]</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};
