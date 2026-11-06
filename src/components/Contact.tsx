import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  Sparkles, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#090810] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5 text-purple-400" />
            <span>06 // Connect</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Amazing Together.</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mt-4 text-sm sm:text-base">
            Actively seeking full-time Software Engineer positions in India or remote. Let's discuss open roles, engineering challenges, or collaborate on innovative projects.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Status Card */}
            <div className="bg-gradient-to-br from-[#141221] to-[#0d0b17] p-7 rounded-3xl border border-purple-500/20 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Available for Hire
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Open to Opportunities
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                I am actively interviewing for software engineering roles. Eager to bring technical passion, fast problem-solving velocity, and collaborative enthusiasm to your engineering organization.
              </p>

              {/* Email One-Click Copy Box */}
              <div className="bg-[#090812] p-3.5 rounded-2xl border border-purple-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 truncate">
                    {personalInfo.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-purple-300 bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 flex items-center gap-1.5 transition-all shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Quick Metadata */}
            <div className="bg-[#12101e]/80 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">Location</div>
                  <div className="text-sm font-semibold text-white">India 🇮🇳 (Open to Relocation & Remote)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">Response Time</div>
                  <div className="text-sm font-semibold text-white">Within 24 Hours</div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="bg-[#12101e]/80 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-md">
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-4">
                Professional Networks & Profiles
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#19162a] hover:bg-purple-900/30 border border-purple-500/20 text-zinc-300 hover:text-white transition-all text-xs font-medium"
                >
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#19162a] hover:bg-purple-900/30 border border-purple-500/20 text-zinc-300 hover:text-white transition-all text-xs font-medium"
                >
                  <Linkedin className="w-4 h-4 text-purple-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#19162a] hover:bg-purple-900/30 border border-purple-500/20 text-zinc-300 hover:text-white transition-all text-xs font-medium"
                >
                  <Twitter className="w-4 h-4 text-purple-400" />
                  <span>Twitter / X</span>
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#19162a] hover:bg-purple-900/30 border border-purple-500/20 text-zinc-300 hover:text-white transition-all text-xs font-medium"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>Direct Mail</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#131120] to-[#0c0a15] p-8 sm:p-10 rounded-3xl border border-purple-500/20 shadow-2xl backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-8">
              Fill out this form to connect regarding job opportunities, technical consulting, or software projects.
            </p>

            {submitted ? (
              <div className="py-12 px-6 text-center flex flex-col items-center justify-center bg-purple-950/30 rounded-2xl border border-purple-500/40">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h4>
                <p className="text-sm text-zinc-300 max-w-md">
                  Thank you for reaching out. I've received your note and will get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-purple-300 mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0a0913] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/25 focus:outline-none focus:border-purple-400 transition-colors placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-purple-300 mb-2">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#0a0913] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/25 focus:outline-none focus:border-purple-400 transition-colors placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-purple-300 mb-2">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Software Engineer Opportunity / Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#0a0913] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/25 focus:outline-none focus:border-purple-400 transition-colors placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-purple-300">
                      MESSAGE *
                    </label>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {formData.message.length} / 1000 chars
                    </span>
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={1000}
                    placeholder="Describe the opportunity or idea you'd like to discuss..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#0a0913] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/25 focus:outline-none focus:border-purple-400 transition-colors placeholder:text-zinc-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 border border-purple-400/30 active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

