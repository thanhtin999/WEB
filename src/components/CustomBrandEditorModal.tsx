import React, { useState } from 'react';
import { X, Sparkles, Sliders, Check, RotateCcw } from 'lucide-react';
import { BrandConfig } from '../types';

interface CustomBrandEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBrand: BrandConfig;
  onSaveCustomBrand: (updated: BrandConfig) => void;
  onResetToPreset: () => void;
}

export const CustomBrandEditorModal: React.FC<CustomBrandEditorModalProps> = ({
  isOpen,
  onClose,
  currentBrand,
  onSaveCustomBrand,
  onResetToPreset,
}) => {
  const [formData, setFormData] = useState({
    name: currentBrand.name,
    industry: currentBrand.industry,
    tagline: currentBrand.tagline,
    headline: currentBrand.headline,
    subheadline: currentBrand.subheadline,
    primaryCtaText: currentBrand.primaryCtaText,
    secondaryCtaText: currentBrand.secondaryCtaText,
    badgeText: currentBrand.badgeText,
    targetAudience: currentBrand.targetAudience,
    location: currentBrand.location,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BrandConfig = {
      ...currentBrand,
      name: formData.name || 'LUMINA',
      industry: formData.industry || 'Enterprise Digital Systems',
      tagline: formData.tagline || currentBrand.tagline,
      headline: formData.headline || currentBrand.headline,
      subheadline: formData.subheadline || currentBrand.subheadline,
      primaryCtaText: formData.primaryCtaText || 'Schedule Strategic Consultation',
      secondaryCtaText: formData.secondaryCtaText || 'Explore Verified Case Studies',
      badgeText: formData.badgeText || currentBrand.badgeText,
      targetAudience: formData.targetAudience || currentBrand.targetAudience,
      location: formData.location || currentBrand.location,
    };
    onSaveCustomBrand(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left my-6">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Customize Brand & Industry Parameters
              </h3>
              <p className="text-xs text-slate-500">
                Adapt the website copy, headlines, and value propositions for your business
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Brand Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                placeholder="e.g. Apex Global, Aethel, Vanguard"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Industry / Sector:</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                placeholder="e.g. Enterprise AI Strategy, Luxury Architecture"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-semibold block">Main Value Tagline / Slogan:</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-semibold block">Hero Main Headline:</label>
            <textarea
              name="headline"
              rows={2}
              value={formData.headline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white resize-none font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-semibold block">Hero Subheadline / Value Pitch:</label>
            <textarea
              name="subheadline"
              rows={3}
              value={formData.subheadline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Primary CTA Button Label:</label>
              <input
                type="text"
                name="primaryCtaText"
                value={formData.primaryCtaText}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Secondary CTA Button Label:</label>
              <input
                type="text"
                name="secondaryCtaText"
                value={formData.secondaryCtaText}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Accreditation / Top Badge:</label>
              <input
                type="text"
                name="badgeText"
                value={formData.badgeText}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Global Locations / Markets:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onResetToPreset();
                onClose();
              }}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Apply Custom Branding</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
