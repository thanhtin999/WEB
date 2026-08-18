import React, { useState } from 'react';
import { Sparkles, Cpu, Layers, ShieldCheck, Globe, CheckCircle2, Quote, ArrowRight, Award } from 'lucide-react';
import { BrandConfig } from '../types';

interface AboutSectionProps {
  brand: BrandConfig;
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ brand, onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'pillars' | 'governance'>('narrative');

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <Globe className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="about" className="py-28 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <span className="w-2 h-0.5 bg-blue-600"></span>
              <span>The {brand.name} Story & Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              {brand.aboutStory.title}
            </h2>
          </div>

          {/* Interactive Narrative Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 border border-slate-200 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('narrative')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'narrative'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Founding Thesis
            </button>
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'pillars'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Core Pillars ({brand.pillars.length})
            </button>
            <button
              onClick={() => setActiveTab('governance')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'governance'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Global Presence
            </button>
          </div>
        </div>

        {/* Tab 1: Founding Thesis & Executive Quote */}
        {activeTab === 'narrative' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-xl sm:text-2xl text-slate-800 font-medium leading-relaxed">
                {brand.aboutStory.leadParagraph}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                {brand.aboutStory.secondaryParagraph}
              </p>

              {/* Mission Statement Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-blue-600">
                  Our Uncompromising Mission
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {brand.aboutStory.mission}
                </p>
              </div>

              {/* Executive Quote Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm relative space-y-4">
                <Quote className="w-8 h-8 text-blue-100 absolute top-4 right-4" />
                <p className="text-base sm:text-lg italic text-slate-800 font-serif-luxury leading-relaxed">
                  "{brand.aboutStory.quote}"
                </p>
                <div className="flex items-center gap-3.5 pt-3 border-t border-slate-100">
                  <img
                    src={brand.aboutStory.image}
                    alt={brand.aboutStory.author}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 font-heading">
                      {brand.aboutStory.author}
                    </div>
                    <div className="text-xs text-blue-600 font-semibold">
                      {brand.aboutStory.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Right Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src={brand.aboutStory.image}
                  alt="Executive Leadership"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-slate-200/80 backdrop-blur-md space-y-2 shadow-lg text-left">
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Principal Direct Governance</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    Every client engagement is directed by veteran principal partners with 100% committed delivery accountability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Core Pillars */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brand.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between group text-left"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-blue-600 block">
                    Proven Output:
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    {pillar.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Global Presence & Locations */}
        {activeTab === 'governance' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-blue-600 font-bold text-xs uppercase tracking-wider">
                North America Hub
              </div>
              <h4 className="text-xl font-bold text-slate-900">New York City</h4>
              <p className="text-xs text-slate-500">
                Madison Avenue Financial District • Enterprise Systems & AI Lab
              </p>
              <div className="text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                EST / GMT-5 Coverage
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-blue-600 font-bold text-xs uppercase tracking-wider">
                European Headquarters
              </div>
              <h4 className="text-xl font-bold text-slate-900">London & Zurich</h4>
              <p className="text-xs text-slate-500">
                Mayfair & Paradeplatz • High-Value Private Architecture & Governance
              </p>
              <div className="text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                GMT / CET Coverage
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-blue-600 font-bold text-xs uppercase tracking-wider">
                Asia-Pacific Center
              </div>
              <h4 className="text-xl font-bold text-slate-900">Singapore & Tokyo</h4>
              <p className="text-xs text-slate-500">
                Marina Bay & Roppongi • High-Throughput Edge Engineering
              </p>
              <div className="text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                SGT / JST Coverage
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Ready to evaluate how {brand.name} can transform your organization?
            </h4>
            <p className="text-xs text-slate-300">
              Speak directly with a founding principal architect. No junior sales reps.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-full text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors whitespace-nowrap shadow-md active:scale-95"
          >
            Schedule Briefing
          </button>
        </div>
      </div>
    </section>
  );
};
