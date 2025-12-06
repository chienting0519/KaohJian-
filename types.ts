
export interface ServiceItem {
  title: string;
  items: string[];
  icon: string;
  description: string;
}

export interface OperatingHours {
  day: string;
  time: string;
  isOpen: boolean;
}

export interface Symptom {
  id: string;
  question: string;
  riskWeight: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Article {
  id: string;
  slug: string; // 新增 slug 用於 SEO 網址
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
}

export interface Doctor {
  name: string;
  title: string;
  specialties: string[];
  experience: string[];
  certifications: string[];
}

export interface Clinic {
  name: string;
  address: string;
  phone: string;
}

export interface AllianceHospital {
  name: string;
  url: string;
  address: string;
  phone: string;
}