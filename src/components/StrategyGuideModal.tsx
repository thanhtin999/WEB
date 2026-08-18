import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Sparkles, Layers, FileText, Compass, Target, Search, Palette, Zap, ArrowRight } from 'lucide-react';
import { STRATEGY_GUIDE_DATA } from '../data/strategyGuideData';
import { BrandConfig } from '../types';

interface StrategyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: BrandConfig;
}

export const StrategyGuideModal: React.FC<StrategyGuideModalProps> = ({
  isOpen,
  onClose,
  brand,
}) => {
  const [activeTab, setActiveTab] = useState<
    'sitemap' | 'headlines' | 'ctas' | 'positioning' | 'seo' | 'visual' | 'cro'
  >('sitemap');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left my-6">
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                Brand Strategy & Conversion Architecture Playbook
              </h3>
              <p className="text-xs text-slate-500">
                Complete strategic deliverables, sitemap, headlines, SEO metadata, and CRO guidelines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 pt-3 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'sitemap', label: '1. Recommended Sitemap', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'headlines', label: '2. Headline Matrix', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'ctas', label: '3. CTA Variations', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'positioning', label: '4. Positioning Statement', icon: <Target className="w-3.5 h-3.5" /> },
            { id: 'seo', label: '5. SEO & Meta Tags', icon: <Search className="w-3.5 h-3.5" /> },
            { id: 'visual', label: '6. Visual & Icon Direction', icon: <Palette className="w-3.5 h-3.5" /> },
            { id: 'cro', label: '7. 10 CRO Recommendations', icon: <Sparkles className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-white shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-slate-700">
          {/* Tab 1: Sitemap */}
          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-heading">
                    Recommended High-Converting Website Sitemap & Information Architecture
                  </h4>
                  <p className="text-xs text-slate-500">
                    Engineered for high cognitive clarity, progressive disclosure, and minimum friction.
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(STRATEGY_GUIDE_DATA.sitemap, null, 2),
                      'sitemap'
                    )
                  }
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200"
                >
                  {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sitemap' ? 'Copied JSON' : 'Copy Sitemap'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRATEGY_GUIDE_DATA.sitemap.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 font-mono">
                        {item.section}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-600">
                        {item.page}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Purpose:</strong> {item.purpose}
                    </p>
                    <div className="text-[11px] text-blue-700 bg-blue-50 p-2 rounded-lg border border-blue-100">
                      <strong>Conversion Target:</strong> {item.conversionGoal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Headlines */}
          {activeTab === 'headlines' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  High-Converting Headline & Subheadline Options
                </h4>
                <p className="text-xs text-slate-500">
                  Select and test based on your current audience sophistication and acquisition channel.
                </p>
              </div>

              <div className="space-y-4">
                {STRATEGY_GUIDE_DATA.headlineOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {opt.type}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(`${opt.headline}\n\n${opt.subheadline}`, `hl-${idx}`)
                        }
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"
                      >
                        {copiedKey === `hl-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>

                    <h5 className="text-lg font-bold text-slate-900 font-heading">
                      "{opt.headline}"
                    </h5>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {opt.subheadline}
                    </p>

                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                      <strong>Best For:</strong> {opt.bestFor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: CTAs */}
          {activeTab === 'ctas' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Stage-Specific Call-To-Action (CTA) Framework
                </h4>
                <p className="text-xs text-slate-500">
                  Engineered with primary actions, secondary low-commitment paths, and risk-reversal microcopy.
                </p>
              </div>

              <div className="space-y-4">
                {STRATEGY_GUIDE_DATA.ctaVariations.map((cta, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {cta.stage}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs">
                        <span className="text-[10px] text-blue-600 uppercase font-bold block">
                          Primary CTA (High Intent)
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{cta.primaryCta}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">
                          Secondary CTA (Exploratory)
                        </span>
                        <span className="font-semibold text-slate-800 text-sm">{cta.secondaryCta}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                      <strong>Conversion Microcopy:</strong> {cta.microcopy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Positioning Statement */}
          {activeTab === 'positioning' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-heading">
                    Core Brand Positioning & Value Proposition Matrix
                  </h4>
                  <p className="text-xs text-slate-500">
                    Geoffrey Moore classic positioning framework adapted for high-ticket enterprise services.
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${STRATEGY_GUIDE_DATA.positioningStatement.forTarget}\n${STRATEGY_GUIDE_DATA.positioningStatement.whoNeed}\n${STRATEGY_GUIDE_DATA.positioningStatement.ourBrand}\n${STRATEGY_GUIDE_DATA.positioningStatement.thatProvides}\n${STRATEGY_GUIDE_DATA.positioningStatement.unlike}\n${STRATEGY_GUIDE_DATA.positioningStatement.ourDifferentiator}`,
                      'pos'
                    )
                  }
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200"
                >
                  {copiedKey === 'pos' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Statement</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">Target Audience:</span>
                  <p className="text-slate-900 font-medium">{STRATEGY_GUIDE_DATA.positioningStatement.forTarget}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">Primary Problem / Need:</span>
                  <p className="text-slate-900 font-medium">{STRATEGY_GUIDE_DATA.positioningStatement.whoNeed}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">Brand Definition:</span>
                  <p className="text-slate-900 font-medium">{STRATEGY_GUIDE_DATA.positioningStatement.ourBrand}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">Key Benefit & Output:</span>
                  <p className="text-slate-900 font-medium">{STRATEGY_GUIDE_DATA.positioningStatement.thatProvides}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">Competitive Contrast:</span>
                  <p className="text-slate-900 font-medium">{STRATEGY_GUIDE_DATA.positioningStatement.unlike}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">Primary Differentiator:</span>
                  <p className="text-emerald-700 font-medium">{STRATEGY_GUIDE_DATA.positioningStatement.ourDifferentiator}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: SEO Metadata */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  SEO Title, Meta Description & Semantic Keywords
                </h4>
                <p className="text-xs text-slate-500">
                  Optimized for top search intent in enterprise digital transformation and bespoke AI architecture.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-blue-600 font-bold uppercase block">Title Tag (&lt;title&gt;):</span>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono text-xs flex justify-between items-center">
                    <span>{STRATEGY_GUIDE_DATA.seoData.titleTag}</span>
                    <button onClick={() => copyToClipboard(STRATEGY_GUIDE_DATA.seoData.titleTag, 'seo-title')}>
                      {copiedKey === 'seo-title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-blue-600 font-bold uppercase block">Meta Description:</span>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono text-xs flex justify-between items-center">
                    <span>{STRATEGY_GUIDE_DATA.seoData.metaDescription}</span>
                    <button onClick={() => copyToClipboard(STRATEGY_GUIDE_DATA.seoData.metaDescription, 'seo-desc')}>
                      {copiedKey === 'seo-desc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Primary Keywords:</span>
                  <div className="flex flex-wrap gap-2">
                    {STRATEGY_GUIDE_DATA.seoData.primaryKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Visual & Icons */}
          {activeTab === 'visual' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Visual Direction, Color Palette & Typography
                </h4>
                <p className="text-xs text-slate-500">
                  Clean clarity, precision, and balanced editorial layout.
                </p>
              </div>

              {/* Color Palette */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STRATEGY_GUIDE_DATA.visualStyleGuide.colorPalette.map((col, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-full h-8 rounded-lg border border-slate-200" style={{ backgroundColor: col.hex }} />
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold">{col.role}</div>
                      <div className="text-xs font-bold text-slate-900">{col.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{col.hex}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="text-xs font-bold text-blue-600 uppercase">Image Direction</div>
                <p className="text-slate-700 leading-relaxed">
                  {STRATEGY_GUIDE_DATA.visualStyleGuide.imageDirection}
                </p>

                <div className="text-xs font-bold text-blue-600 uppercase pt-2">Iconography</div>
                <p className="text-slate-700 leading-relaxed">
                  {STRATEGY_GUIDE_DATA.visualStyleGuide.iconStyle}
                </p>
              </div>
            </div>
          )}

          {/* Tab 7: 10 CRO Recommendations */}
          {activeTab === 'cro' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  10 Data-Backed Conversion Rate Optimization (CRO) Recommendations
                </h4>
                <p className="text-xs text-slate-500">
                  Proven tactics implemented across high-ticket enterprise websites to maximize qualified leads and deal velocity.
                </p>
              </div>

              <div className="space-y-3">
                {STRATEGY_GUIDE_DATA.croRecommendations.map((cro) => (
                  <div
                    key={cro.number}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center font-mono">
                        {cro.number}
                      </span>
                      <h5 className="font-bold text-slate-900 text-sm">{cro.title}</h5>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-7">
                      <strong>Rationale:</strong> {cro.rationale}
                    </p>
                    <div className="text-blue-700 pl-7 text-[11px]">
                      <strong>Implementation:</strong> {cro.actionableTactic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Active Brand Context: <strong className="text-slate-900">{brand.name} ({brand.industry})</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-sm"
          >
            Close Strategy Playbook
          </button>
        </div>
      </div>
    </div>
  );
};
