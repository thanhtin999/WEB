import React from 'react';
import { Cpu, Globe, Server, TrendingUp, Sparkles, Home, Compass, Zap, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BrandConfig, ServiceItem } from '../types';

interface ServicesSectionProps {
  brand: BrandConfig;
  onSelectService: (service: ServiceItem) => void;
  onInquireService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  brand,
  onSelectService,
  onInquireService,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-600" />;
      case 'Server':
        return <Server className="w-6 h-6 text-blue-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'Home':
        return <Home className="w-6 h-6 text-blue-600" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      default:
        return <Zap className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <span className="w-2 h-0.5 bg-blue-600"></span>
              <span>Proprietary Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Bespoke {brand.industry.split('&')[0]} Solutions
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Engineered with zero technical debt, verified mathematical rigor, and guaranteed commercial ROI.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Fixed Milestone Pricing Available</span>
            </div>
          </div>
        </div>

        {/* Services Grid (Bento style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brand.services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col justify-between space-y-6 group hover:shadow-lg text-left"
            >
              <div className="space-y-5">
                {/* Header with icon & tag */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Title & Short description */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* ROI impact banner */}
                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Targeted Business Impact</span>
                  <span className="text-blue-700 font-bold">{service.roiImpact}</span>
                </div>

                {/* Key Deliverables checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                    Core Deliverables:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.slice(0, 4).map((del, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Actions & Timeline */}
              <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  <span>Typical Timeline: </span>
                  <strong className="text-slate-900">{service.timeline}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
                  >
                    View Full Spec
                  </button>

                  <button
                    onClick={() => onInquireService(service)}
                    className="px-5 py-2 rounded-full text-xs font-bold text-white bg-black hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
