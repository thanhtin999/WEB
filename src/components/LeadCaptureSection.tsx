import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Send, Download, Sparkles, User, Building, MessageSquare } from 'lucide-react';
import { BrandConfig, ServiceItem, PricingPlan } from '../types';

interface LeadCaptureSectionProps {
  brand: BrandConfig;
  preSelectedService?: ServiceItem | null;
  preSelectedPlan?: PricingPlan | null;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({
  brand,
  preSelectedService,
  preSelectedPlan,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form state
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(
    preSelectedService ? [preSelectedService.title] : ['Enterprise AI Systems', 'Custom Web Architecture']
  );
  const [selectedBudget, setSelectedBudget] = useState<string>(
    preSelectedPlan ? preSelectedPlan.priceProject : '$50,000 – $100,000'
  );
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Immediate (Next 2-4 Weeks)');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Tomorrow, 2:00 PM EST');

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    phone: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const objectiveOptions = [
    'Enterprise AI & LLM Systems',
    'High-Performance Web Architecture',
    'Cloud Modernization & Microservices',
    'Mobile Application Flagship',
    'Design System & Conversion Overhaul',
    'Executive Strategic Advisory',
  ];

  const budgetOptions = [
    '$25,000 – $50,000',
    '$50,000 – $100,000',
    '$100,000 – $250,000',
    '$250,000+',
  ];

  const timelineOptions = [
    'Immediate (Next 2-4 Weeks)',
    '1 – 3 Months',
    'Q3 / Q4 Strategic Roadmap',
    'Exploratory / Feasibility Study',
  ];

  const timeSlotOptions = [
    'Tomorrow, 10:00 AM EST',
    'Tomorrow, 2:00 PM EST',
    'Wednesday, 11:30 AM EST',
    'Thursday, 3:00 PM EST',
  ];

  const toggleObjective = (obj: string) => {
    if (selectedObjectives.includes(obj)) {
      setSelectedObjectives(selectedObjectives.filter((o) => o !== obj));
    } else {
      setSelectedObjectives([...selectedObjectives, obj]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (selectedObjectives.length === 0) {
        alert('Please select at least one primary project objective.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#3b82f6', '#60a5fa', '#0f172a'],
    });

    setSubmitted(true);
  };

  const downloadSimulatedIcs = () => {
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//${brand.name}//Executive Briefing//EN\nBEGIN:VEVENT\nSUMMARY:Executive Strategy Briefing with ${brand.name} Principal Architect\nDESCRIPTION:High-level architectural assessment and commercial scoping.\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${brand.name.toLowerCase()}-strategy-briefing.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-28 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>Direct Principal Engagement</span>
            <span className="w-2 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Schedule Your Strategic Executive Briefing
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Receive a complimentary 30-minute technical roadmap and architecture audit with our founding partners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Direct Executive Channels
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For time-sensitive RFPs, sovereign commissions, or enterprise M&A technical evaluations:
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Direct Principal Dispatch
                    </span>
                    <a
                      href={`mailto:partners@${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      partners@{brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Global Client Concierge
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      +1 (800) 749-9284 • +44 20 7946 0912
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Global Headquarters
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {brand.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The {brand.name} Guarantee</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Mutual non-disclosure agreement (NDA) executed in &lt; 4 hours</li>
                  <li>Direct senior partner discussion (zero junior account handlers)</li>
                  <li>Tailored architectural risk & ROI audit included</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Scheduler (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm relative text-left">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span className="text-blue-600">
                        Step {currentStep} of 3: {currentStep === 1 ? 'Scope & Budget' : currentStep === 2 ? 'Schedule Slot' : 'Contact Credentials'}
                      </span>
                      <span>{Math.round((currentStep / 3) * 100)}% Completed</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Step 1: Project Scope & Budget Selection */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 block">
                          1. Select Your Primary Project Objectives:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {objectiveOptions.map((obj) => {
                            const isSelected = selectedObjectives.includes(obj);
                            return (
                              <button
                                type="button"
                                key={obj}
                                onClick={() => toggleObjective(obj)}
                                className={`p-3 rounded-2xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                                }`}
                              >
                                <span>{obj}</span>
                                {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 block">
                          2. Anticipated Investment Allocation:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {budgetOptions.map((b) => (
                            <button
                              type="button"
                              key={b}
                              onClick={() => setSelectedBudget(b)}
                              className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all border ${
                                selectedBudget === b
                                  ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-7 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm active:scale-95"
                        >
                          <span>Continue to Scheduling</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Timeline & Time Slot Picker */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 block">
                          Target Deployment Timeline:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {timelineOptions.map((tl) => (
                            <button
                              type="button"
                              key={tl}
                              onClick={() => setSelectedTimeline(tl)}
                              className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                                selectedTimeline === tl
                                  ? 'bg-blue-600 text-white font-bold border-blue-600'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {tl}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 block flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>Select Preferred Consultation Window:</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {timeSlotOptions.map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                                selectedTimeSlot === slot
                                  ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <span>{slot}</span>
                              {selectedTimeSlot === slot && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-7 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm active:scale-95"
                        >
                          <span>Proceed to Contact Info</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact & Lead Credentials */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-blue-600" />
                            <span>Full Name *</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            placeholder="e.g. Marcus Vance"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white ${
                              errors.fullName ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                            }`}
                          />
                          {errors.fullName && <span className="text-[10px] text-red-500">{errors.fullName}</span>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-blue-600" />
                            <span>Corporate Email *</span>
                          </label>
                          <input
                            type="email"
                            name="workEmail"
                            placeholder="e.g. marcus@enterprise.com"
                            value={formData.workEmail}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white ${
                              errors.workEmail ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                            }`}
                          />
                          {errors.workEmail && <span className="text-[10px] text-red-500">{errors.workEmail}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-blue-600" />
                            <span>Company / Organization *</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            placeholder="e.g. Apex Global Corp"
                            value={formData.company}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white ${
                              errors.company ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                            }`}
                          />
                          {errors.company && <span className="text-[10px] text-red-500">{errors.company}</span>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-blue-600" />
                            <span>Phone Number (Optional)</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 019-2834"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          <span>Brief Project Notes / Specific Requirements (Optional)</span>
                        </label>
                        <textarea
                          name="notes"
                          rows={2}
                          placeholder="Provide any context on your existing tech stack, legacy bottlenecks, or key deadlines..."
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                        ></textarea>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
                        >
                          ← Back
                        </button>

                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md flex items-center gap-2 active:scale-95"
                        >
                          <Send className="w-4 h-4" />
                          <span>Confirm Strategic Briefing</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                /* Celebration & Confirmation Card */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                      Strategic Consultation Requested!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. A mutual NDA and calendar invitation for <strong className="text-blue-600">{selectedTimeSlot}</strong> have been logged for our executive team.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500">Target Organization:</span>
                      <span className="font-bold text-slate-900">{formData.company}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500">Budget Range:</span>
                      <span className="font-bold text-blue-600">{selectedBudget}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500">SLA Response Window:</span>
                      <span className="font-bold text-emerald-600">&lt; 4 Hours Guaranteed</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={downloadSimulatedIcs}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Add to Google / Outlook Calendar (.ics)</span>
                    </button>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                      }}
                      className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 transition-colors"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
