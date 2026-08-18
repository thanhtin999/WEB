import React, { useState } from 'react';
import { Compass, Layers, Code2, Rocket, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { BrandConfig, ProcessStep } from '../types';

interface ProcessSectionProps {
  brand: BrandConfig;
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ brand, onOpenConsultation }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-600" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-blue-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const currentStep = brand.processSteps[selectedStepIndex] || brand.processSteps[0];

  return (
    <section id="process" className="py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>The Engineered Roadmap</span>
            <span className="w-2 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            From Blueprint to Production in 4 Seamless Phases
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Predictable delivery cycles, bi-weekly staging releases, and zero-loss IP handover.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {brand.processSteps.map((step, idx) => {
            const isSelected = idx === selectedStepIndex;
            return (
              <button
                key={idx}
                onClick={() => setSelectedStepIndex(idx)}
                className={`p-6 rounded-3xl text-left transition-all duration-200 border flex flex-col justify-between space-y-4 group cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-blue-600 shadow-md'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-2xl font-black font-heading ${
                      isSelected ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      isSelected
                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    {getStepIcon(step.iconName)}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3
                    className={`text-base font-bold font-heading line-clamp-1 ${
                      isSelected ? 'text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    {step.title.split('&')[0]}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{step.duration}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 w-full">
                  <span
                    className={`text-[11px] font-semibold flex items-center gap-1 ${
                      isSelected ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  >
                    {isSelected ? 'Currently Viewing' : 'Click to Inspect'}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Deep-Dive Card */}
        {currentStep && (
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white font-heading">
                    Phase {currentStep.stepNumber}
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-slate-700 border border-slate-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {currentStep.duration}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {currentStep.title}
                </h3>

                <p className="text-sm font-semibold text-blue-700">
                  {currentStep.subtitle}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentStep.description}
                </p>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                    Phase Output & Handover Deliverables:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStep.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Governance Callout */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quality Assurance Standard</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Every milestone requires bilateral executive sign-off before proceeding to the subsequent phase. You have real-time visibility into GitHub staging branches and sprint velocity.
                </p>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 px-4 rounded-full text-xs font-bold text-white bg-black hover:bg-slate-800 transition-colors shadow-sm active:scale-95"
                >
                  Initiate Phase 01 Diagnostic
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
