export type PageTab = 'home' | 'services' | 'packages' | 'targets' | 'portfolio' | 'clients' | 'about' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  badge?: string;
  deliverables: string[];
  benefits: string[];
  sampleOutcome: string;
}

export interface ServicePackageGroup {
  id: string;
  serviceId: string;
  serviceTitle: string;
  description?: string;
  badge?: string;
  iconName: string;
  coreServices?: { title: string; description: string }[];
  fixedFeatures?: string[];
  packages: DetailedPackageItem[];
}

export interface DetailedPackageItem {
  id: string;
  title: string;
  suitableFor?: string;
  deliverables: string;
  servicesIncluded?: string[];
  features?: string[];
  platforms?: string;
  technicalDeliverables?: string;
  stationeryDeliverables?: string;
  digitalPresence?: string;
  brandGuidelines?: string;
  fileDelivery?: string;
  dailyPublishing?: string;
  monthlyTotal?: string;
  isPopular?: boolean;
  badge?: string;
}

export interface TargetClient {
  id: string;
  title: string;
  description: string;
  iconName: string;
  growthStrategy: string;
  topServices: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  clientName: string;
  image: string;
  images?: string[];
  description: string;
  tags: string[];
  results?: string;
}

export interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialPackageId?: string;
  initialPackageGroupId?: string;
}

