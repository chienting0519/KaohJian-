import { GoogleGenAI } from "@google/genai";
import { CLINIC_INFO, SERVICES, SCHEDULE_CONTEXT } from '../constants';  

const apiKey = import.meta.env.VITE_API_KEY || '';      

let ai: GoogleGenAI | null = null;

// Initialize client safely
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

export const sendMessageToGemini = async (userMessage: string, history: string[]): Promise<string> => {
  if (!ai) {
    return "目前無法連線到 AI 助理，請檢查 API 金鑰或是稍後再試。";
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
        *   無論用戶問什麼健康問題，**必須**首先考慮對腎臟的影響。
    
    2.  **水分攝取警告 (最高優先級)**: 
        *   若用戶問題涉及「喝水」、「口渴」、「茶/飲料」或「感冒多喝水」。
        *   **必須在回答的第一句話**加入以下警語:
        *   「**特別提醒：若您是洗腎或慢性腎臟病患，請務必遵照醫師指示嚴格限制飲水量，以免發生肺水腫等危險。**」
    
    3.  **紅字警示與美觀排版 (Visual Highlights)**:
        *   **紅色警示 (Critical Warnings)**: 當提到 **「楊桃」** (絕對禁忌)、**高鉀水果**、**嚴重副作用** 或 **緊急症狀** (如肺水腫、呼吸困難) 時，**必須** 使用 \`[[\` 和 \`]]\` 包起來。
            *   範例: 腎友絕對禁止食用 [[楊桃]]，因為會引發神經毒素中毒，嚴重會導致昏迷。
            *   範例: 若出現 [[呼吸困難]] 或 [[肺水腫]] 症狀，請立即就醫。
        *   **排版美學**: 
            *   請多使用 **條列式** (List) 來整理資訊，讓手機版面易於閱讀。
            *   段落之間請保留適當空行。
            *   關鍵字可以用 **粗體** 強調。
            *   **互動引導**: 用戶可能想進一步問的「延伸主題」，維持使用 ** ** 包起來。
                *   範例: 您可以詢問 **門診時間** 或 **低鉀飲食**。

    4.  **飲食建議**: 
        *   自動帶入「低鉀」、「低磷」。
        *   區分階段：未洗腎(低蛋白) vs 已洗腎(高蛋白)。
    
    5.  **預約引導**: 若需預約，請直接輸出網址 ${CLINIC_INFO.bookingLink}，不要用 Markdown 語法。
    
    你的任務:
    回答要親切、專業、繁體中文。請確保排版漂亮、清晰，讓長輩也能輕鬆閱讀。
  `;

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        System Context: ${clinicContext}
        
        Conversation History:
        ${history.join('\n')}
        
        User: ${userMessage}
        Assistant:
      `,
    });
    
    return response.text || "抱歉，我現在無法處理您的請求。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "發生連線錯誤，請稍後再試。";
  }
};
