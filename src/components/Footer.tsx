import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, ShieldCheck, Globe, CheckCircle2, Lock, Sparkles, Send } from 'lucide-react';
import { BrandConfig } from '../types';

interface FooterProps {
  brand: BrandConfig;
  onScrollToSection: (sectionId: string) => void;
  onOpenStrategyGuide: () => void;
  onOpenCustomBrandEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brand,
  onScrollToSection,
  onOpenStrategyGuide,
  onOpenCustomBrandEditor,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      alert('Please provide a valid corporate email address.');
      return;
    }
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs relative overflow-hidden">
      {/* Top Banner Lead Magnet */}
      <div className="border-b border-slate-800 bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complimentary Enterprise Intelligence Briefing</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Subscribe to The {brand.name} Quarterly Architecture Monograph
              </h3>
              <p className="text-xs text-slate-400">
                Quarterly teardowns of enterprise AI deployments, distributed systems latency benchmarks, and high-converting UX principles. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-6">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="corporate.email@organization.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-full bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                  >
                    <span>Receive Monograph</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Welcome to the {brand.name} Executive Monograph list. Check your inbox for the Q3 Executive Benchmark PDF.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          {/* Brand Info & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                {brand.name.slice(0, 1)}
              </div>
              <span className="font-heading font-black tracking-wider text-xl text-white">
                {brand.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {brand.tagline}. Partnering with Fortune 500 enterprises and global scaleups to architect resilient digital ecosystems and category-defining applications.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Global System Status: Operational</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                UTC {currentTime}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform & Architecture
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onScrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  Brand Heritage & Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('services')}
                  className="hover:text-white transition-colors"
                >
                  Core Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('why-us')}
                  className="hover:text-white transition-colors"
                >
                  Competitive Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('portfolio')}
                  className="hover:text-white transition-colors"
                >
                  Verified Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('process')}
                  className="hover:text-white transition-colors"
                >
                  4-Stage Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Investment & Governance
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onScrollToSection('pricing')}
                  className="hover:text-white transition-colors"
                >
                  Predictable Milestone Tiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-white transition-colors"
                >
                  Objection & Governance FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStrategyGuide}
                  className="hover:text-blue-400 text-blue-400/90 font-semibold transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Sitemap & Copy Blueprint</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomBrandEditor}
                  className="hover:text-white transition-colors"
                >
                  Custom Brand Switcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Schedule Strategy Briefing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Global Hubs
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <strong className="text-slate-200 block">New York (Americas)</strong>
                <span>Madison Avenue, NY 10022</span>
              </li>
              <li>
                <strong className="text-slate-200 block">London (EMEA)</strong>
                <span>Mayfair, London W1K</span>
              </li>
              <li>
                <strong className="text-slate-200 block">Singapore (APAC)</strong>
                <span>Marina Bay Financial Centre</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} {brand.name} Prestige Global Ltd. All rights reserved. SOC 2 Type II & ISO 27001 Audited.
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="hover:text-slate-300 cursor-pointer">Confidentiality Agreement</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Protocol</span>
            <span className="hover:text-slate-300 cursor-pointer">SLA Terms</span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-2"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
