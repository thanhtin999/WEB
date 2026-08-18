import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Filter, CheckCircle2, TrendingUp, Layers } from 'lucide-react';
import { BrandConfig, ProjectItem } from '../types';

interface ShowcaseSectionProps {
  brand: BrandConfig;
  onSelectProject: (project: ProjectItem) => void;
  onOpenConsultation: () => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  brand,
  onSelectProject,
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Extract unique categories from portfolio
  const categories = ['All', ...Array.from(new Set(brand.portfolio.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === 'All'
      ? brand.portfolio
      : brand.portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <span className="w-2 h-0.5 bg-blue-600"></span>
              <span>Verified Case Studies & Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Engineering Monumental Commercial Outcomes
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Explore how our principal squads architect high-converting systems for global industry leaders.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 border border-slate-200 p-1 rounded-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="rounded-3xl bg-slate-50/80 border border-slate-200 overflow-hidden hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:shadow-lg"
            >
              {/* Image with overlay badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-blue-700 border border-slate-200">
                    {project.category}
                  </span>
                  <span className="text-xs font-bold text-white px-2.5 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-xs">
                    {project.year}
                  </span>
                </div>

                {/* Impact Metric Floating Callout */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-md flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      {project.impactLabel}
                    </span>
                    <span className="text-xl font-extrabold text-blue-600 font-heading">
                      {project.impactMetric}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500">
                    {project.client}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:underline">
                    <span>Read Comprehensive Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-xl font-bold text-white font-heading">
              Have a high-stakes project requiring flawless execution?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our principal architects can analyze your requirements under standard mutual NDA.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-full text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-md active:scale-95 whitespace-nowrap"
          >
            Request Private Case Review
          </button>
        </div>
      </div>
    </section>
  );
};
