export type TabType = 
  | 'competitor-audit'
  | 'ad-copy-generator'
  | 'banner-studio'
  | 'video-creator'
  | 'budget-optimizer';

export interface CompetitorAd {
  id: string;
  competitor: string;
  logoLetter: string;
  logoColor: 'primary' | 'tertiary' | 'secondary' | 'accent';
  adPreviewUrl: string;
  adPreviewAlt: string;
  platforms: string[];
  runTime: string;
  estCtr: string;
  ctrValue: number;
  headline?: string;
  primaryText?: string;
  adFormat?: string;
  targetAudience?: string;
  estimatedSpend?: string;
}

export interface CompetitorAuditResult {
  domainOrNiche: string;
  competitors: string[];
  adSpendEstimate: string;
  momChange: string;
  keywordOverlap: string;
  keywordCompetition: string;
  totalCreativeVolume: string;
  activeChannelsCount: number;
  identifiedAds: CompetitorAd[];
  auditIntelligenceSummary?: string;
}

export interface AdCopyVariant {
  id: string;
  label: string;
  tagColor: 'secondary' | 'tertiary' | 'primary';
  headline: string;
  primaryText: string;
  score: number;
  predictionRating?: 'High' | 'Medium' | 'Exceptional';
  bestForNote?: string;
}

export interface BannerConfig {
  headline: string;
  subheadline: string;
  ctaText: string;
  brandHex: string;
  accentHex: string;
  aspectRatio: '1:1' | '9:16';
  badgeText: string;
  memberCount: string;
  bgStyle: 'gradient' | 'circuit' | 'mesh' | 'solid';
}

export interface VideoSlide {
  id: string;
  title: string;
  hookText: string;
  timestamp: string;
  durationSeconds: number;
  imageUrl: string;
  imageAlt: string;
  isActive?: boolean;
}

export interface VideoSequenceConfig {
  brandIdentity: string;
  hooks: string[];
  ctaText: string;
  slideDuration: number;
  slides: VideoSlide[];
}

export interface AdSet {
  id: string;
  name: string;
  code: string;
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
  convValue: number;
  trendStatus: 'up' | 'down' | 'flat';
  trendColor: string;
}

export interface BudgetOptimizerData {
  dailyBudget: number;
  targetRoas: number;
  projectedRevenue: number;
  momRevenueGrowth: number;
  avgCpc: number;
  momCpcChange: number;
  conversions: number;
  momConversionGrowth: number;
  adScore: number;
  adSets: AdSet[];
}

export interface SavedProject {
  id: string;
  name: string;
  updatedAt: string;
  tab: TabType;
  description: string;
}
