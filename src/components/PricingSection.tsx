import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, HelpCircle, Calculator, Zap } from 'lucide-react';
import { BrandConfig, PricingPlan } from '../types';

interface PricingSectionProps {
  brand: BrandConfig;
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenConsultation: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  brand,
  onSelectPlan,
  onOpenConsultation,
}) => {
  const [billingCycle, setBillingCycle] = useState<'project' | 'retainer'>('project');
  const [teamSizeSlider, setTeamSizeSlider] = useState<number>(2); // 1 to 5 squads

  // ROI Calculator formula
  const estimatedRevenueMultiplier = (teamSizeSlider * 2.2).toFixed(1);
  const estimatedDeliveryWeeks = Math.max(4, 12 - teamSizeSlider * 1.5).toFixed(0);
  const estimatedSquadCost = teamSizeSlider * 22000;

  return (
    <section id="pricing" className="py-28 bg-slate-50 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>Transparent Investment Tiers</span>
            <span className="w-2 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Predictable Milestone Pricing & Dedicated Retainers
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Zero hidden hourly fees. Complete source code IP assignment upon milestone completion.
          </p>

          {/* Billing Cycle Selector Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-slate-200/70 p-1 rounded-full border border-slate-200 flex items-center gap-1">
              <button
                onClick={() => setBillingCycle('project')}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                  billingCycle === 'project'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fixed Milestone Project
              </button>
              <button
                onClick={() => setBillingCycle('retainer')}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                  billingCycle === 'retainer'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Dedicated Monthly Squad</span>
                <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-emerald-100 text-emerald-700 font-extrabold">
                  SLA 24/7
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brand.pricingPlans.map((plan) => {
            const isPopular = plan.popular;
            const displayPrice =
              billingCycle === 'project'
                ? plan.priceProject
                : `$${plan.priceMonthly.toLocaleString()} / mo`;

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between space-y-6 relative text-left ${
                  isPopular
                    ? 'bg-white border-2 border-blue-600 shadow-xl scale-100 lg:-translate-y-2'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] tracking-wider uppercase shadow-md whitespace-nowrap">
                    {plan.badge || 'Recommended Flagship'}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {plan.idealFor}
                    </p>
                  </div>

                  <div className="py-2 border-y border-slate-100 space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
                      {displayPrice}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {billingCycle === 'project'
                        ? 'Fixed milestone-based scope'
                        : 'Dedicated senior pod retainer'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      What is Included:
                    </div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-98 ${
                      isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Includes 100% IP Handover • SLA War Room Support
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive ROI & Squad Estimator */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Calculator className="w-4 h-4" />
                <span>Interactive Enterprise ROI & Velocity Estimator</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Model Your Digital Infrastructure Investment
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Adjust dedicated principal engineering pods to estimate time-to-market acceleration and commercial return on investment.
              </p>

              {/* Slider Control */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700">Dedicated Senior Architect Pods:</span>
                  <span className="text-blue-600 font-bold text-sm">{teamSizeSlider} Principal Squad(s)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={teamSizeSlider}
                  onChange={(e) => setTeamSizeSlider(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 Pod (Growth)</span>
                  <span>3 Pods (Multi-Cloud)</span>
                  <span>5 Pods (Global Enterprise)</span>
                </div>
              </div>
            </div>

            {/* Right Projected Output Card */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 text-white space-y-5 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center justify-between">
                <span>Projected Commercial Output</span>
                <Zap className="w-3.5 h-3.5 text-blue-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Estimated Time-to-Market
                  </span>
                  <span className="text-2xl font-black text-white font-heading">
                    {estimatedDeliveryWeeks} Weeks
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Expected ROI Multiplier
                  </span>
                  <span className="text-2xl font-black text-emerald-400 font-heading">
                    {estimatedRevenueMultiplier}x
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Target Monthly Investment:</span>
                  <span className="font-bold text-white">${estimatedSquadCost.toLocaleString()} / mo</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SLA Guarantee:</span>
                  <span className="text-emerald-400 font-semibold">99.999% SLA Uptime</span>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full py-3 px-4 rounded-full text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md active:scale-95"
              >
                Request Custom Scope & Financial Model
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
