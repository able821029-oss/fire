export type SiteStatus = 'normal' | 'caution' | 'critical' | 'offline';

export interface Site {
  id: string;
  name: string;
  subLocation: string;
  address: string;
  gps: { lat: number; lng: number };
  x: number; // percentage in radar map
  y: number; // percentage in radar map
  status: SiteStatus;
  chargersTotal: number;
  rapidChargers: number;
  slowChargers: number;
  currentTemp: number;
  tempThreshold: number;
  smokeStatus: string;
  breakerStatus: '정상 가동' | '자동 트립 완료' | '수동 차단' | '점검중';
  assignedManager: string;
  managerPhone: string;
  managerStatus: string;
  detectionTime?: string;
  detectionAgo?: string;
  ventilationActive: boolean;
  fireBlanketReady: boolean;
  sprinklerReady: boolean;
}

export interface Incident {
  id: string;
  level: 'critical' | 'caution' | 'maintenance';
  levelLabel: string;
  siteId: string;
  siteName: string;
  timeAgo: string;
  timestamp: string;
  title: string;
  description: string;
  manager: string;
  managerStatus: string;
  actionsDone: string[];
  powerCut: boolean;
  confirmed: boolean;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  description: string;
  normalCount: number;
  cautionCount: number;
  faultCount: number;
  normalPercentage: number;
  details: string;
  breakdown: { label: string; count: number; color: string; pct: number }[];
}

export interface TimelineDataPoint {
  hour: string;
  tempAnomalies: number;
  commDelays: number;
  maintenance: number;
  total: number;
  isPeak?: boolean;
}
