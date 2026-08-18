import React from 'react';
import { ShieldCheck, Award, Lock, CheckCircle } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const enterpriseClients = [
    { name: 'NEXUS GLOBAL', tag: 'FinTech Syndicate' },
    { name: 'VALENCIA LUXURY', tag: 'Maison Flagship' },
    { name: 'AETHER BIOSCIENCE', tag: 'Genomics Lab' },
    { name: 'STERLING CAPITAL', tag: 'Private Equity' },
    { name: 'KINETIC ENERGY', tag: 'Clean Grid' },
    { name: 'SOLARIA GROUP', tag: 'Real Estate' },
  ];

  const pressFeatures = [
    'Forbes',
    'Bloomberg',
    'Financial Times',
    'TechCrunch',
    'Architectural Digest',
    'The Wall Street Journal',
  ];

  return (
    <section className="border-b border-slate-200/80 bg-white py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Upper: Trust Statement & Press Mentions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 text-center md:text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Trusted by Category Leaders & Institutional Capital Worldwide</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-400 tracking-wider">
            {pressFeatures.map((press, i) => (
              <span key={i} className="hover:text-slate-900 transition-colors">
                {press}
              </span>
            ))}
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {enterpriseClients.map((client, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/80 hover:shadow-sm transition-all duration-200 text-center flex flex-col items-center justify-center gap-1 group"
            >
              <div className="font-heading font-black tracking-wider text-base text-slate-800 group-hover:text-blue-600 transition-colors">
                {client.name}
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-500">
                {client.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Security & Compliance Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 pt-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>SOC 2 Type II Certified & Audited</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Zero-Trust Enterprise Data Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>ISO 27001 & GDPR Compliant Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>99.999% Historical Production Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
