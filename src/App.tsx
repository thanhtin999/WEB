import React, { useState } from 'react';
import { BRAND_PRESETS, getPresetById } from './data/brandPresets';
import { BrandConfig, ServiceItem, ProjectItem, PricingPlan } from './types';
import { Navbar } from './components/Navbar';
import { BrandSwitcherBar } from './components/BrandSwitcherBar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { SocialProofSection } from './components/SocialProofSection';
import { FaqSection } from './components/FaqSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { Footer } from './components/Footer';
import { StrategyGuideModal } from './components/StrategyGuideModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CustomBrandEditorModal } from './components/CustomBrandEditorModal';
import { BookOpen, Calendar, Sparkles } from 'lucide-react';

export default function App() {
  const [currentBrand, setCurrentBrand] = useState<BrandConfig>(BRAND_PRESETS[0]);
  
  // Modals state
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [customBrandModalOpen, setCustomBrandModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  
  // Pre-selected parameters for lead capture form
  const [preSelectedService, setPreSelectedService] = useState<ServiceItem | null>(null);
  const [preSelectedPlan, setPreSelectedPlan] = useState<PricingPlan | null>(null);

  const handleSelectPreset = (presetId: string) => {
    const preset = getPresetById(presetId);
    setCurrentBrand(preset);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = () => {
    handleScrollToSection('contact');
  };

  const handleInquireService = (service: ServiceItem) => {
    setPreSelectedService(service);
    handleScrollToSection('contact');
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setPreSelectedPlan(plan);
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans">
      {/* 1. Top Live Preset & Customizer Bar */}
      <BrandSwitcherBar
        currentBrandId={currentBrand.id}
        onSelectPreset={handleSelectPreset}
        onOpenCustomEditor={() => setCustomBrandModalOpen(true)}
        onOpenStrategyGuide={() => setStrategyModalOpen(true)}
      />

      {/* 2. Sticky Glass Navbar */}
      <Navbar
        brand={currentBrand}
        onOpenStrategyGuide={() => setStrategyModalOpen(true)}
        onOpenCustomBrandEditor={() => setCustomBrandModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <HeroSection
          brand={currentBrand}
          onScrollToSection={handleScrollToSection}
          onOpenConsultation={handleOpenConsultation}
          onOpenCaseStudyModal={() => setSelectedCaseStudy(currentBrand.portfolio[0] || null)}
        />

        {/* 4. Trust & Enterprise Credentials Bar */}
        <TrustBar />

        {/* 5. Brand Heritage & About Section */}
        <AboutSection
          brand={currentBrand}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 6. Services & Solutions Bento Grid */}
        <ServicesSection
          brand={currentBrand}
          onSelectService={(service) => setSelectedServiceDetail(service)}
          onInquireService={handleInquireService}
        />

        {/* 7. Why Choose Us & Comparison Matrix */}
        <WhyChooseUsSection
          brand={currentBrand}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 8. Portfolio / Showcase & Impact Gallery */}
        <ShowcaseSection
          brand={currentBrand}
          onSelectProject={(project) => setSelectedCaseStudy(project)}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 9. 4-Stage Methodology & Roadmap */}
        <ProcessSection
          brand={currentBrand}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 10. Pricing & Interactive ROI Estimator */}
        <PricingSection
          brand={currentBrand}
          onSelectPlan={handleSelectPlan}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 11. Social Proof & Verified Executive Testimonials */}
        <SocialProofSection
          brand={currentBrand}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 12. Objection-Buster FAQ Section */}
        <FaqSection
          brand={currentBrand}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 13. High-Converting 3-Step Lead & Consultation Scheduler */}
        <LeadCaptureSection
          brand={currentBrand}
          preSelectedService={preSelectedService}
          preSelectedPlan={preSelectedPlan}
        />
      </main>

      {/* 14. Mega-Footer */}
      <Footer
        brand={currentBrand}
        onScrollToSection={handleScrollToSection}
        onOpenStrategyGuide={() => setStrategyModalOpen(true)}
        onOpenCustomBrandEditor={() => setCustomBrandModalOpen(true)}
      />

      {/* Strategy Guide Playbook Modal */}
      <StrategyGuideModal
        isOpen={strategyModalOpen}
        onClose={() => setStrategyModalOpen(false)}
        brand={currentBrand}
      />

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onInquire={handleInquireService}
      />

      {/* Custom Brand & Industry Parameters Modal */}
      <CustomBrandEditorModal
        isOpen={customBrandModalOpen}
        onClose={() => setCustomBrandModalOpen(false)}
        currentBrand={currentBrand}
        onSaveCustomBrand={(updated) => setCurrentBrand(updated)}
        onResetToPreset={() => setCurrentBrand(BRAND_PRESETS[0])}
      />

      {/* Floating Strategy Quick-Access Pill (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-30 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setStrategyModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 text-slate-800 border border-slate-200/80 backdrop-blur-xl shadow-lg hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold transition-all group"
          title="Open Sitemap, Copywriting & CRO Deliverables"
        >
          <BookOpen className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
          <span>Brand Strategy Guide</span>
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        </button>
      </div>
    </div>
  );
}
