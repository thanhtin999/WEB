import React from 'react';
import { Sparkles, Sliders, CheckCircle2, Globe, Building2, Landmark, ShieldCheck } from 'lucide-react';
import { BRAND_PRESETS } from '../data/brandPresets';
import { BrandConfig } from '../types';

interface BrandSwitcherBarProps {
  currentBrandId: string;
  onSelectPreset: (presetId: string) => void;
  onOpenCustomEditor: () => void;
  onOpenStrategyGuide: () => void;
}

export const BrandSwitcherBar: React.FC<BrandSwitcherBarProps> = ({
  currentBrandId,
  onSelectPreset,
  onOpenCustomEditor,
  onOpenStrategyGuide,
}) => {
  const getPresetIcon = (id: string) => {
    switch (id) {
      case 'lumina-digital':
        return <Globe className="w-3.5 h-3.5" />;
      case 'vanguard-architecture':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'aethel-capital':
        return <Landmark className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 text-slate-300 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold uppercase tracking-wider text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Sleek High-Converting Interface
          </div>
          <span className="hidden sm:inline text-slate-400 text-xs font-medium">
            Select Industry Preset:
          </span>
        </div>

        {/* Center: Presets list */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {BRAND_PRESETS.map((preset) => {
            const isActive = preset.id === currentBrandId;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-150 font-medium whitespace-nowrap text-xs ${
                  isActive
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                }`}
                title={`Switch website context to ${preset.name} (${preset.industry})`}
              >
                {getPresetIcon(preset.id)}
                <span>{preset.name}</span>
                <span className="hidden md:inline text-[10px] opacity-75 font-normal">
                  ({preset.industry.split(' ')[0]})
                </span>
                {isActive && <CheckCircle2 className="w-3 h-3 text-blue-600 ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Right: Customization & Strategy Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCustomEditor}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-full border border-slate-700 transition-colors font-medium text-xs"
            title="Type your own brand name, industry, and value propositions"
          >
            <Sliders className="w-3 h-3 text-blue-400" />
            <span>Customize Brand</span>
          </button>
          
          <button
            onClick={onOpenStrategyGuide}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors font-semibold text-xs shadow-xs"
          >
            <Sparkles className="w-3 h-3" />
            <span>Sitemap & Copy Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
