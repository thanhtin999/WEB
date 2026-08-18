import React from 'react';
import { Users, CheckCircle2, Zap, Key, ShieldCheck, XCircle, Check, HelpCircle } from 'lucide-react';
import { BrandConfig } from '../types';

interface WhyChooseUsSectionProps {
  brand: BrandConfig;
  onOpenConsultation: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  brand,
  onOpenConsultation,
}) => {
  const getPointIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-blue-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-blue-600" />;
      case 'Key':
        return <Key className="w-6 h-6 text-blue-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="why-us" className="py-28 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>The Competitive Advantage</span>
            <span className="w-2 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            {brand.whyChooseUs.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {brand.whyChooseUs.description}
          </p>
        </div>

        {/* 4 Differentiator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brand.whyChooseUs.points.map((point, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 space-y-4 text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                {getPointIcon(point.icon)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {point.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Objective Side-by-Side Comparison Matrix */}
        <div className="mt-12 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Architectural & Operational Benchmark Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Direct comparison between {brand.name} principal squads and conventional tier-1 agencies
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                {brand.name} Standard
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                Legacy Agency Standard
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Evaluation Dimension</th>
                  <th className="py-4 px-6 text-blue-700 bg-blue-50/50">{brand.name} Squad</th>
                  <th className="py-4 px-6 text-slate-400">Traditional Agency / IT Vendor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {brand.whyChooseUs.comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 text-xs sm:text-sm">
                      {row.metric}
                    </td>
                    <td className="py-4 px-6 font-bold text-blue-700 bg-blue-50/30 text-xs sm:text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.us}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs sm:text-sm">
                      <span className="text-slate-500 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{row.traditional}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              * Based on anonymized client procurement audits across 120+ enterprise software engagements.
            </p>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-black hover:bg-slate-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap"
            >
              Verify Our Track Record
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
