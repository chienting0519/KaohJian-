
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
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  content: string; // 新增內文欄位
}

export interface Doctor {
  name: string;
  title: string;
  specialties: string[];
  experience: string[];
  certifications: string[];
}
