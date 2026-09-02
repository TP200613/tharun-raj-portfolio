import React, { useState } from 'react';
import { Mail, Phone, Send, Copy, Check, MessageSquare, Clock, FileText, Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { soundFx } from '../utils/sound';

export const Contact: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration / Job Opportunity',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    soundFx.playSuccess();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email).catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    soundFx.playSuccess();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone).catch(() => {});
    }
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClick();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      soundFx.playSuccess();

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject} - from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.open(mailtoUrl, '_blank');
    }, 600);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 page-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--theme-light)] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-dark)] shadow-xs">
          <Mail size={14} className="text-[var(--theme-primary)]" />
          <span>DIRECT TRANSMISSION &amp; RESUME</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1c1917]">
          Get in <span className="text-gradient-theme">Touch with Tharun</span>
        </h2>
        <p className="text-sm sm:text-base text-[#57534e] max-w-xl mx-auto">
          Have an exciting project, job opportunity, internship, or collaborative idea? Let's connect directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Cards & Info */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Direct Email Card */}
          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-4 hover:border-[var(--theme-primary)] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)]">
                <Mail size={22} className="text-[var(--theme-primary)]" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-[#1c1917]">Direct Email</h3>
                <p className="text-xs text-[#78716c] font-medium">Primary Inbox (Proton)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] flex items-center justify-between gap-2">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="text-xs sm:text-sm font-semibold text-[var(--theme-dark)] hover:underline truncate font-mono"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] text-[#57534e] hover:text-[#1c1917] border border-[var(--theme-border)] transition-colors shrink-0 cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={16} className="text-[#16a34a]" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#15803d]">
              <Clock size={14} />
              <span>Response time: &lt; 12 hours</span>
            </div>
          </div>

          {/* Direct Phone / Mobile Card */}
          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-4 hover:border-[var(--theme-primary)] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)]">
                <Phone size={22} className="text-[var(--theme-primary)]" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-[#1c1917]">Mobile Contact</h3>
                <p className="text-xs text-[#78716c] font-medium">Call / WhatsApp</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] flex items-center justify-between gap-2">
              <a
                href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                className="text-xs sm:text-sm font-semibold text-[var(--theme-dark)] hover:underline truncate font-mono"
              >
                {PORTFOLIO_DATA.personal.phone}
              </a>
              <button
                onClick={handleCopyPhone}
                className="p-2 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] text-[#57534e] hover:text-[#1c1917] border border-[var(--theme-border)] transition-colors shrink-0 cursor-pointer"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check size={16} className="text-[#16a34a]" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--theme-dark)]">
              <ShieldCheck size={14} />
              <span>Available for recruitment &amp; internships</span>
            </div>
          </div>

          {/* Resume & CV Action Card */}
          <div className="p-6 rounded-2xl bg-[var(--theme-light)] border border-[var(--theme-border)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--theme-dark)] font-bold text-sm">
                <FileText size={18} className="text-[var(--theme-primary)]" />
                <span>Curriculum Vitae</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ffffff] text-[var(--theme-dark)] border border-[var(--theme-border)]">
                PDF / PRINT READY
              </span>
            </div>
            <p className="text-xs text-[#57534e]">
              View or download Tharun's full official resume detailing academic credentials, projects, training, certificates, and skills.
            </p>
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-xl btn-theme-primary text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Open &amp; Print Resume</span>
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-3.5 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] flex items-center gap-2.5 group transition-all shadow-sm"
            >
              <div className="p-2 rounded-lg bg-[var(--theme-light)] text-[var(--theme-dark)] group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-colors">
                <GithubIcon size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#1c1917]">GitHub</div>
                <div className="text-[10px] text-[#78716c] font-mono truncate">@TP200613</div>
              </div>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-3.5 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] flex items-center gap-2.5 group transition-all shadow-sm"
            >
              <div className="p-2 rounded-lg bg-[var(--theme-light)] text-[var(--theme-dark)] group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-colors">
                <LeetCodeIcon size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#1c1917]">LeetCode</div>
                <div className="text-[10px] text-[#78716c] font-mono">@_Tharun_13</div>
              </div>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-3.5 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] flex items-center gap-2.5 group transition-all shadow-sm"
            >
              <div className="p-2 rounded-lg bg-[var(--theme-light)] text-[var(--theme-dark)] group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                <LinkedinIcon size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#1c1917]">LinkedIn</div>
                <div className="text-[10px] text-[#78716c] font-mono truncate">tharun1306</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Transmission Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-[var(--theme-primary)]" />
              <h3 className="text-lg font-heading font-bold text-[#1c1917]">Send a Direct Message</h3>
            </div>
            <span className="text-xs font-bold text-[#15803d]">READY</span>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-[#1c1917]">Message Dispatched!</h4>
              <p className="text-sm text-[#57534e] max-w-md mx-auto">
                Thank you, <span className="text-[var(--theme-dark)] font-semibold">{formData.name}</span>. Your mail client has been opened, or email directly to <span className="text-[#1c1917] font-mono font-semibold">{PORTFOLIO_DATA.personal.email}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Project Collaboration', message: '' });
                }}
                className="px-4 py-2 rounded-xl bg-[#ffffff] hover:bg-[#faf8f5] border border-[var(--theme-border)] text-xs font-bold text-[#57534e] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#57534e]">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[var(--theme-primary)] focus:outline-none text-xs sm:text-sm font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#57534e]">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[var(--theme-primary)] focus:outline-none text-xs sm:text-sm font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#57534e]">SUBJECT / PURPOSE</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Full-Stack Opportunity / Internship / Project"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[var(--theme-primary)] focus:outline-none text-xs sm:text-sm font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#57534e]">MESSAGE *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the role, project scope, tech stack, or ideas..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[var(--theme-primary)] focus:outline-none text-xs sm:text-sm font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl btn-theme-primary font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message to Tharun</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
