import React, { useState } from 'react';
import { Star, Quote, Play, ShieldCheck, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { BrandConfig, Testimonial } from '../types';

interface SocialProofSectionProps {
  brand: BrandConfig;
  onOpenConsultation: () => void;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  brand,
  onOpenConsultation,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<boolean>(false);

  const tags = ['All', ...Array.from(new Set(brand.testimonials.map((t) => t.industryTag)))];

  const filteredTestimonials =
    selectedTag === 'All'
      ? brand.testimonials
      : brand.testimonials.filter((t) => t.industryTag === selectedTag);

  return (
    <section className="py-28 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <span className="w-2 h-0.5 bg-blue-600"></span>
              <span>Executive Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Trusted by the World's Most Demanding Leaders
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Read uncensored feedback and performance data from C-level executives who bet their reputations on {brand.name}.
            </p>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 p-1 rounded-full">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  selectedTag === tag
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col justify-between space-y-6 text-left relative group hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Rating & Metric badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {testimonial.verifiedMetric}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-800 leading-relaxed font-serif-luxury italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 shrink-0"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 font-heading">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {testimonial.role}
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video Case Study / Executive Debrief Preview */}
        <div className="rounded-3xl bg-slate-900 text-white overflow-hidden shadow-xl p-8 sm:p-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Award className="w-4 h-4" />
                <span>Executive Video Briefing & Retrospective</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                "How We Generated $84M in 12 Months with {brand.name}"
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Watch an in-depth conversation with the executive leadership team on overcoming technical debt, architecting high-throughput edge backends, and executing a zero-downtime global rollout.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setPlayingVideo(true)}
                  className="px-6 py-3 rounded-full text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-md active:scale-95"
                >
                  <Play className="w-4 h-4 fill-slate-900" />
                  <span>Watch 4-Minute Case Film</span>
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  Download Case PDF
                </button>
              </div>
            </div>

            {/* Video Thumbnail Preview */}
            <div className="lg:col-span-6 relative">
              <div
                onClick={() => setPlayingVideo(true)}
                className="aspect-video rounded-2xl overflow-hidden relative cursor-pointer group border border-white/10 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
                  alt="Executive Video Case Study"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-slate-900 ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-xs font-medium text-white flex items-center justify-between">
                  <span>Runtime: 4m 18s • 4K HDR</span>
                  <span className="text-blue-400 font-bold">Featured Documentary</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Modal Simulation */}
        {playingVideo && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl space-y-4 p-6 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Executive Case Study Documentary</h4>
                  <p className="text-xs text-slate-500">{brand.name} Architecture Briefing</p>
                </div>
                <button
                  onClick={() => setPlayingVideo(false)}
                  className="px-3.5 py-1.5 bg-slate-100 text-slate-700 hover:text-slate-900 rounded-full text-xs font-semibold"
                >
                  Close ✕
                </button>
              </div>

              {/* Video Player Frame */}
              <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-center p-8 space-y-3 text-white">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h5 className="text-lg font-bold text-white">Full Executive Documentary Playing</h5>
                <p className="text-xs text-slate-300 max-w-md">
                  "Deploying mission-critical platforms with zero downtime and measurable revenue impact across 38 global markets."
                </p>
                <div className="w-full max-w-md bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-2/3 animate-pulse"></div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setPlayingVideo(false);
                    onOpenConsultation();
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-sm"
                >
                  Schedule Strategy Discussion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
