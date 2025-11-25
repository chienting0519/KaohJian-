// 請確認你的 package.json 有安裝 @google/generative-ai
// 如果沒有，請執行 npm install @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CLINIC_INFO, SERVICES, SCHEDULE_CONTEXT } from '../constants';

// 1. 這裡使用正確的 Vite 變數寫法
const apiKey = import.meta.env.VITE_API_KEY || '';       

// 2. 初始化變數
let genAI: GoogleGenerativeAI | null = null;

try {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenerativeAI:", error);
}

export const sendMessageToGemini = async (userMessage: string, history: string[]): Promise<string> => {
  if (!genAI) {
    console.error("API Key is missing or invalid.");
    return "目前無法連線到 AI 助理 (API Key 設定問題)，請聯繫管理員。";
  }

  const clinicContext = `
    你現在是「${CLINIC_INFO.name}」的 AI 腎臟專科健康助理。
    
    診所資訊:
    地址: ${CLINIC_INFO.address}
    電話: ${CLINIC_INFO.phone}
    口號: ${CLINIC_INFO.slogan}
    預約連結: ${CLINIC_INFO.bookingLink}
    
    ${SCHEDULE_CONTEXT}
    
    服務項目:
    ${SERVICES.map(s => `${s.title}: ${s.items.join(', ')}`).join('\n')}
    
    **極其重要的回答原則 (必須嚴格遵守):**
    
    1.  **腎臟專科絕對優先視角**: 
        * 無論用戶問什麼健康問題，**必須**首先考慮對腎臟的影響。
    
    2.  **水分攝取警告 (最高優先級)**: 
        * 若用戶問題涉及「喝水」、「口渴」、「茶/飲料」或「感冒多喝水」。
        * **必須在回答的第一句話**加入以下警語:
        * 「**特別提醒：若您是洗腎或慢性腎臟病患，請務必遵照醫師指示嚴格限制飲水量，以免發生肺水腫等危險。**」
    
    3.  **紅字警示與美觀排版 (Visual Highlights)**:
        * **紅色警示 (Critical Warnings)**: 當提到 **「楊桃」** (絕對禁忌)、**高鉀水果**、**嚴重副作用** 或 **緊急症狀** (如肺水腫、呼吸困難) 時，**必須** 使用 \`[[\` 和 \`]]\` 包起來。
        * **排版美學**: 
            * 請多使用 **條列式** (List) 來整理資訊，讓手機版面易於閱讀。
            * 段落之間請保留適當空行。
            * 關鍵字可以用 **粗體** 強調。
            * **互動引導**: 用戶可能想進一步問的「延伸主題」，維持使用 ** ** 包起來。

    4.  **飲食建議**: 
        * 自動帶入「低鉀」、「低磷」。
        * 區分階段：未洗腎(低蛋白) vs 已洗腎(高蛋白)。
    
    5.  **預約引導**: 若需預約，請直接輸出網址 ${CLINIC_INFO.bookingLink}，不要用 Markdown 語法。
    
    你的任務:
    回答要親切、專業、繁體中文。請確保排版漂亮、清晰，讓長輩也能輕鬆閱讀。
  `;

  try {
    // 3. 這裡修正為正確的 gemini-1.5-flash 模型
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // 4. 組合 Prompt (這部分維持你的邏輯)
    const prompt = `
        System Context: ${clinicContext}
        
        Conversation History:
        ${history.join('\n')}
        
        User: ${userMessage}
        Assistant:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text || "抱歉，我現在無法處理您的請求。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "發生連線錯誤，請稍後再試。";
  }
};
