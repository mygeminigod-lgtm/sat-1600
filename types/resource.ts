 export type ResourceCategory =
  | 'official'
  | 'free'
  | 'math'
  | 'reading-writing'
  | 'practice-tests'
  | 'books'
  | 'youtube'
  | 'ai-tools'
  | 'international';

export type ResourceType =
  | 'Practice Test'
  | 'Question Bank'
  | 'Course'
  | 'Book'
  | 'Video'
  | 'AI'
  | 'Website'
  | 'Study Guide';

export type PriceType = 'Free' | 'Paid' | 'Freemium';

export type DifficultyLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | '1400+'
  | '1500+'
  | 'All Levels';

export type SectionType = 'All' | 'Math' | 'Reading & Writing';

export type QualityStatus = 'Official' | 'Highly Recommended' | 'Third-Party';

export interface SATResource {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: ResourceCategory;
  section: SectionType;
  type: ResourceType;
  price: PriceType;
  priceDetails?: string;
  difficulty: DifficultyLevel;
  official: boolean;
  recommended: boolean;
  qualityStatus: QualityStatus;
  qualityReason: string;
  source: string;
  lastChecked: string;
  bestFor: string;
  tags: string[];

  // Detailed Modal / Page properties
  whatItProvides: string[];
  whoShouldUseIt: string;
  advantages: string[];
  limitations: string[];
  whyUseIt: string;
  relatedResourceIds?: string[];

  // Category specific fields
  topic?: string; // For Math (Algebra, Advanced Math, Problem Solving & Data Analysis, Geometry & Trig) or RW (Information & Ideas, Craft & Structure, etc.)
  provider?: string; // For Practice Tests and Books
  testsCount?: number; // Number of practice tests (e.g. 6)
  digitalCompatible?: boolean; // Is it digital SAT compatible?
  channelName?: string; // For YouTube channels
  aiDisclaimer?: string; // Explicit non-affiliation disclaimer for AI tools
  internationalNotes?: string; // Specific international tips (fees, passport, test centers)
}

export interface ResourceFilterState {
  searchQuery: string;
  category: string; // 'all' or ResourceCategory
  section: string; // 'all' | 'Math' | 'Reading & Writing'
  type: string; // 'all' | ResourceType
  price: string; // 'all' | PriceType
  difficulty: string; // 'all' | DifficultyLevel
  source: string; // 'all' | 'Official' | 'Highly Recommended' | 'Third-Party'
}

export interface SmartRecommendationQuery {
  currentScore: number;
  targetScore: number;
  weakSection: 'Math' | 'Reading & Writing' | 'Both';
  studyTime: '2 weeks' | '1 month' | '2-3 months' | '6+ months';
  weeklyHours: number;
}

export interface RecommendationStep {
  stepNumber: number;
  title: string;
  purpose: string;
  primaryResourceId: string;
  secondaryResourceId?: string;
  timeAllocation: string;
  tacticalAdvice: string;
}
