export type LandingPageConfig = {
  meta: {
    title: string;
    description: string;
    noindex?: boolean;
  };
  hero: {
    badge?: string;
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  trustBadges: Array<{
    icon: string;
    text: string;
  }>;
  form: {
    step1Label: string;
    step1Options: Array<{ label: string; value: string }>;
    step2Label: string;
    step2Options: Array<{ label: string; value: string }>;
    submitText: string;
    reassurance: string;
  };
  problemSolution: {
    problemTitle: string;
    problemPoints: string[];
    problemImage?: string;
    solutionTitle: string;
    solutionPoints: string[];
    solutionImage?: string;
  };
  services: {
    title: string;
    badge?: string;
    highlightWord?: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  beforeAfter: Array<{
    before: string | null;
    after: string | null;
    caption: string;
  }>;
  testimonials: {
    average: number;
    count: number;
    items: Array<{
      name: string;
      city: string;
      rating: number;
      text: string;
    }>;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  ctaFinal: {
    title: string;
    subtitle: string;
    ctaText: string;
    reassurance: string;
  };
};
