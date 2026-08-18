import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { BrandConfig, FaqItem } from '../types';

interface FaqSectionProps {
  brand: BrandConfig;
  onOpenConsultation: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ brand, onOpenConsultation }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(brand.faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(brand.faqs.map((f) => f.category)))];

  const filteredFaqs = brand.faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-28 bg-slate-50 relative border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>Clarity & Governance</span>
            <span className="w-2 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Frequently Addressed Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Transparent answers regarding our engagement models, technical standards, and legal guarantees.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search objections, IP, SLAs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 text-left">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              No matching questions found for "{searchQuery}". Please contact our principal architects directly.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-blue-600 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left font-heading font-bold text-base sm:text-lg text-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                      <span>{faq.question}</span>
                    </div>
                    <div
                      className={`p-1.5 rounded-full border transition-colors ${
                        isOpen
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 space-y-3">
                      <p>{faq.answer}</p>
                      <div className="flex items-center gap-2 pt-2 text-xs text-blue-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Category: {faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Desk Prompt */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900 font-heading">
              Have a specific technical or procurement constraint?
            </h4>
            <p className="text-xs text-slate-500">
              We execute mutual NDAs within 4 hours and provide direct principal architect consultations.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-full text-xs font-bold text-white bg-black hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap flex items-center gap-2 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Speak with a Principal Architect</span>
          </button>
        </div>
      </div>
    </section>
  );
};
