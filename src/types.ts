export interface BrandConfig {
  id: string;
  name: string;
  industry: string;
  tagline: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  primaryColorHex: string;
  accentColorHex: string;
  badgeText: string;
  targetAudience: string;
  brandPersonality: string;
  location: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  heroImage: string;
  aboutStory: {
    title: string;
    leadParagraph: string;
    secondaryParagraph: string;
    mission: string;
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  pillars: {
    icon: string;
    title: string;
    description: string;
    metric: string;
  }[];
  services: ServiceItem[];
  whyChooseUs: {
    title: string;
    description: string;
    points: {
      title: string;
      description: string;
      icon: string;
    }[];
    comparison: {
      metric: string;
      us: string;
      traditional: string;
    }[];
  };
  portfolio: ProjectItem[];
  processSteps: ProcessStep[];
  pricingPlans: PricingPlan[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  tag: string;
  roiImpact: string;
  deliverables: string[];
  timeline: string;
  startingPrice: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  summary: string;
  impactMetric: string;
  impactLabel: string;
  year: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverables: string[];
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceProject: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  idealFor: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  verifiedMetric: string;
  industryTag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StrategyGuide {
  sitemap: {
    section: string;
    page: string;
    purpose: string;
    conversionGoal: string;
  }[];
  headlineOptions: {
    type: string;
    headline: string;
    subheadline: string;
    bestFor: string;
  }[];
  ctaVariations: {
    stage: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
  }[];
  positioningStatement: {
    forTarget: string;
    whoNeed: string;
    ourBrand: string;
    thatProvides: string;
    unlike: string;
    ourDifferentiator: string;
  };
  seoData: {
    titleTag: string;
    metaDescription: string;
    primaryKeywords: string[];
    secondaryKeywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
  visualStyleGuide: {
    colorPalette: { role: string; hex: string; name: string }[];
    typography: { type: string; font: string; usage: string }[];
    imageDirection: string;
    iconStyle: string;
  };
  croRecommendations: {
    number: number;
    title: string;
    rationale: string;
    actionableTactic: string;
  }[];
}
