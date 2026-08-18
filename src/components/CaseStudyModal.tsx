import React from 'react';
import { X, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Award, Zap } from 'lucide-react';
import { ProjectItem } from '../types';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenConsultation,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left my-6">
        {/* Header */}
        <div className="relative aspect-[16/8] sm:aspect-[21/9] overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white border border-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-600 text-white">
                {project.category}
              </span>
              <span className="text-xs text-slate-300 font-semibold">{project.year}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {project.title}
            </h3>
            <p className="text-xs text-slate-300">Client: {project.client}</p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-slate-700">
          {/* Key Metric Bar */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-600 block">
                Primary Verified Impact
              </span>
              <span className="text-2xl font-black text-slate-900 font-heading">
                {project.impactMetric}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-600">
              {project.impactLabel}
            </span>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">
                The Enterprise Bottleneck
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
                The Architectural Solution
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Outcome Narrative */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase text-blue-600 tracking-wider">
              Measurable Business Outcome
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {project.outcome}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Architectural Stack:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            Back to Case Studies
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-sm"
          >
            <span>Request Similar Solution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
