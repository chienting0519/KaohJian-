import { OperatingHours, ServiceItem, Symptom, Article, Doctor } from './types';

export const CLINIC_INFO = {
  name: "高健診所",
  slogan: "高雄市民的健康就交給高健診所",
  address: "812高雄市小港區沿海一路88號",
  phone: "07 802 7828",
  bookingLink: "https://lin.ee/RIY5AtG",
  mapLink: "https://www.google.com/maps/search/?api=1&query=高健診所+高雄市小港區沿海一路88號"
};

// Simplified array for schema/metadata, but visual display uses ScheduleTables component
export const OPERATING_HOURS: OperatingHours[] = [
  { day: "星期一", time: "08:00–22:00", isOpen: true },
  { day: "星期二", time: "08:00–16:00", isOpen: true },
  { day: "星期三", time: "08:00–22:00", isOpen: true },
  { day: "星期四", time: "08:00–16:00", isOpen: true },
  { day: "星期五", time: "08:00–22:00", isOpen: true },
  { day: "星期六", time: "08:00–16:00", isOpen: true },
  { day: "星期日", time: "休息", isOpen: false },
];

export const SCHEDULE_CONTEXT = `
詳細門診與洗腎時間:

[洗腎透析時段]
早班: 週一至週六 07:00 - 11:30
午班: 週一至週六 11:30 - 16:30
晚班: 週一、三、五 16:30 - 22:00

[門診時段]
早診: 週一至週六 09:30 - 12:00
午診: 
  - 週一、三、五: 14:00 - 17:00
  - 週二、週六: 12:00 - 16:00 (中午不休息)
  - 週四: 14:00 - 16:30
晚診: 週一、三、五 18:00 - 21:00
`;

export const SERVICES: ServiceItem[] = [
  {
    title: "腎臟專科",
    description: "專業團隊為您的腎臟把關，預防與治療並重。",
    icon: "Activity",
    items: [
      "腎功能異常追蹤",
      "泌尿道感染治療",
      "高尿酸、痛風控制",
      "尿液報告異常分析",
      "水腫評估"
    ]
  },
  {
    title: "一般內科",
    description: "全方位的內科診療，照顧您的日常健康。",
    icon: "Stethoscope",
    items: [
      "三高控制 (高血壓、高血脂、糖尿病)",
      "膽固醇管理",
      "感冒、發燒、頭痛、流鼻水",
      "胸腹部不適",
      "過敏與甲狀腺疾病"
    ]
  },
  {
    title: "健康檢查",
    description: "早期發現早期治療，守護健康的防線。",
    icon: "ClipboardList",
    items: [
      "免費成人健檢 (血壓/糖/脂、肝腎功能、BMI)",
      "大腸癌篩檢 (糞便潛血)",
      "肝炎篩檢 (B、C型)",
      "過敏原檢驗",
      "腎臟超音波與心電圖"
    ]
  },
  {
    title: "預防醫學",
    description: "高端醫療技術，提升生活品質與免疫力。",
    icon: "ShieldCheck",
    items: [
      "ILIB 靜脈雷射",
      "自費減重猛健樂",
      "健康營養美點滴",
      "多種健康營養針"
    ]
  }
];

export const KIDNEY_SYMPTOMS: Symptom[] = [
  { id: 'foam', question: '小便時是否有不易消散的泡沫 (蛋白尿)?', riskWeight: 2 },
  { id: 'edema', question: '最近是否感覺下肢或臉部容易水腫?', riskWeight: 2 },
  { id: 'fatigue', question: '是否經常感到不明原因的疲倦或貧血?', riskWeight: 1 },
  { id: 'bp', question: '是否有高血壓且難以控制?', riskWeight: 2 },
  { id: 'urine_color', question: '尿液顏色是否異常 (如深茶色、血色)?', riskWeight: 3 },
  { id: 'pain', question: '是否有腰部兩側痠痛的感覺?', riskWeight: 1 },
  { id: 'family', question: '直系親屬中是否有腎臟病史?', riskWeight: 2 },
  { id: 'diabetes', question: '本身是否有糖尿病病史?', riskWeight: 3 },
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: '泡泡尿是腎臟病嗎？3分鐘教你自我判斷',
    summary: '許多人看到小便有泡泡就擔心是腎虧或腎臟病。其實泡泡尿不等於蛋白尿，透過簡單的觀察原則，您可以初步篩檢風險。',
    date: '2024.03.15',
    category: '症狀與迷思',
    tags: ['蛋白尿', '腎臟病', '自我檢測']
  },
  {
    id: '2',
    title: '糖尿病友如何護腎？飲食控制是關鍵',
    summary: '糖尿病是造成台灣洗腎人口第一名的主因。控制血糖與血壓，搭配低蛋白飲食原則，能有效延緩腎功能惡化。',
    date: '2024.02.28',
    category: '慢性病管理',
    tags: ['糖尿病', '飲食衛教', '三高控制']
  },
  {
    id: '3',
    title: '洗腎不可怕！認識血液透析與腹膜透析',
    summary: '當腎臟功能無法維持身體運作時，透析治療能幫助您延續生活品質。高健診所提供高品質的血液透析環境，讓病患安心治療。',
    date: '2024.01.10',
    category: '透析治療',
    tags: ['血液透析', '洗腎', '衛教']
  },
  {
    id: '4',
    title: '痛風與高尿酸：隱形的腎臟殺手',
    summary: '高尿酸不僅會引起關節疼痛，長期結晶沉積更會傷害腎臟間質。定期追蹤尿酸值並多喝水，是預防關鍵。',
    date: '2023.12.05',
    category: '疾病預防',
    tags: ['痛風', '高尿酸', '預防醫學']
  }
];

export const MEDICAL_TEAM: Doctor[] = [
  {
    name: "洪錦傳",
    title: "院長",
    specialties: ["腎臟科", "內科"],
    experience: [
      "高雄榮總內科部 腎臟科主治醫師",
      "屏東東港安泰醫院 腎臟主治醫師"
    ],
    certifications: [
      "台灣內科醫學會專科醫師",
      "台灣腎臟醫學會專科醫師"
    ]
  },
  {
    name: "吳美美",
    title: "醫師",
    specialties: ["腎臟科", "內科"],
    experience: [
      "高雄聖功醫院 腎臟内科主治醫師",
      "台中榮民總院 腎臟內科醫師",
      "高雄三泰醫院 腎臟內科醫師"
    ],
    certifications: [
      "台灣內科醫學會專科醫師",
      "台灣腎臟醫學會專科醫師"
    ]
  }
];