import React from 'react';
import { X, CheckCircle2, ArrowRight, Clock, ShieldCheck, Zap, DollarSign } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquire,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left my-6">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
              {service.tag}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-slate-700">
          {/* Detailed Narrative */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Architectural Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Quick Metrics & ROI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                Target Impact
              </span>
              <span className="text-sm font-bold text-blue-600">{service.roiImpact}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                Delivery Schedule
              </span>
              <span className="text-sm font-bold text-slate-900">{service.timeline}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                Milestone Starting
              </span>
              <span className="text-sm font-bold text-emerald-600">{service.startingPrice}</span>
            </div>
          </div>

          {/* Complete Deliverables Matrix */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Standard Deliverables & Milestones:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((del, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SLA & Governance Callout */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Intellectual Property Transfer</span>
            </div>
            <p>
              Includes complete Git repository handover, production Docker configs, Figma design tokens, and 60 days of dedicated principal war room support.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            Back
          </button>

          <button
            onClick={() => {
              onClose();
              onInquire(service);
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-sm"
          >
            <span>Inquire About {service.title.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
