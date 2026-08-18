import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Play, Sparkles, CheckCircle2, ChevronRight, Award, Zap } from 'lucide-react';
import { BrandConfig } from '../types';

interface HeroSectionProps {
  brand: BrandConfig;
  onScrollToSection: (sectionId: string) => void;
  onOpenConsultation: () => void;
  onOpenCaseStudyModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  brand,
  onScrollToSection,
  onOpenConsultation,
  onOpenCaseStudyModal,
}) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const headlineAlternatives = [
    brand.headline,
    `Deploy Category-Defining ${brand.industry.split(' ')[0]} Systems in Weeks, Not Quarters`,
    `Architecting Market Dominance for ${brand.name} Enterprise Partners`,
  ];

  const currentHeadline = headlineAlternatives[headlineIndex % headlineAlternatives.length];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-50 border-b border-slate-200/80"
    >
      {/* Ambient background lighting glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-100/70 via-indigo-50/50 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-gradient-to-bl from-slate-200/60 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.8) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Trust / Award Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-semibold text-blue-950 tracking-wide">
                {brand.badgeText}
              </span>
              <Award className="w-3.5 h-3.5 text-blue-600 ml-1" />
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading">
                {currentHeadline}
              </h1>
              
              {/* Optional quick headline toggle for testing copy variations */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Headline Variation:
                </span>
                <button
                  onClick={() => setHeadlineIndex((prev) => (prev + 1) % headlineAlternatives.length)}
                  className="text-[11px] text-blue-600 hover:text-blue-700 underline font-medium cursor-pointer transition-colors"
                  title="Cycle through tested conversion headlines"
                >
                  Test Variant #{((headlineIndex % headlineAlternatives.length) + 1)} ↻
                </button>
              </div>
            </div>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
              {brand.subheadline}
            </p>

            {/* CTA Group with high-contrast primary and secondary buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={onOpenConsultation}
                  className="group px-7 py-4 rounded-full text-base font-bold text-white bg-black hover:bg-slate-800 shadow-md shadow-slate-300 transition-all duration-200 flex items-center justify-center gap-2 active:scale-98"
                  id="hero-primary-cta"
                >
                  <span>{brand.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onScrollToSection('portfolio')}
                  className="px-6 py-4 rounded-full text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2"
                  id="hero-secondary-cta"
                >
                  <span>{brand.secondaryCtaText}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Conversion Risk Reversal Microcopy */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  30-Min Executive Technical Review
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Guaranteed 4-Hour NDA Execution
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Zero Obligation
                </span>
              </div>
            </div>

            {/* Social Proof Review Rating Widget */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Enterprise Client Executive"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Enterprise Client CTO"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Enterprise Client VP"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                  alt="Enterprise Founder"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-bold text-slate-900 ml-1">4.98 / 5.0</span>
                </div>
                <p className="text-xs text-slate-500">
                  Verified by 240+ global enterprise leaders across 18 countries
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual Showcase & Live Telemetry Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
              {/* Main Visual Image with gradient overlay */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <img
                  src={brand.heroImage}
                  alt={`${brand.name} Flagship Visual`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Floating Interactive Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-full bg-white/90 border border-slate-200/80 backdrop-blur-md text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Production Architecture Active</span>
                  </div>

                  <div className="px-2.5 py-1 rounded-full bg-blue-600 text-[11px] font-bold text-white shadow-xs">
                    Tier-1 Certified
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="p-3.5 rounded-2xl bg-white/95 border border-slate-200/80 backdrop-blur-md shadow-lg space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Enterprise Impact Benchmark</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Realized Performance
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                      <div>
                        <div className="text-xs text-slate-500">Revenue Yield</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900">
                          {brand.stats[0]?.value || '$4.2B+'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Deployment</div>
                        <div className="text-sm sm:text-base font-bold text-blue-600">
                          {brand.stats[2]?.value || '3.4x Faster'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">SLA Retention</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900">
                          {brand.stats[3]?.value || '98.6%'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{brand.name} Signature Systems</h4>
                  <p className="text-xs text-slate-500">Operating across {brand.location}</p>
                </div>
                <button
                  onClick={() => onScrollToSection('services')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full transition-colors flex items-center gap-1"
                >
                  <span>Explore Stack</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Statistics Ribbon Below Hero */}
        <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {brand.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-left group">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading group-hover:text-blue-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-800">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500 leading-snug">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
