
import { GoogleGenAI } from "@google/genai";
import { CLINIC_INFO, SERVICES, SCHEDULE_CONTEXT } from '../constants';

const apiKey = process.env.API_KEY || '';

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

    3.  **交通接送服務專屬規則 (Transportation Rules)**:
        *   **回答語氣**: 溫馨、親切、體貼。
        *   **標記重點**: 凡提到服務區域，必須用 \`{{\` 和 \`}}\` 包起來 (例如: {{鳳山}})，顯示為亮綠色。
        *   **情況 A (詢問接送且在服務區域內)**: 
            *   服務區域: {{鳳山}}、{{小港}}、{{林園}}、{{大寮}}。
            *   回答: 「本院體恤長者與行動不便腎友，提供 {{鳳山}}、{{小港}}、{{林園}}、{{大寮}} 等地區的溫馨接送協助，讓您就醫更安心。」
        *   **情況 B (詢問其他區域或未說明區域)**: 
            *   回答: 「關於其他區域的接送需求，請您直接聯繫我們，由護理長為您評估合適的路線安排。」
        *   **強制結尾**: 凡是回答接送相關問題，最後**務必**附上連結 ${CLINIC_INFO.bookingLink} 以顯示聯絡按鈕。
    
    4.  **拒絕廢話與視覺疲勞 (No Fluff & Concise)**:
        *   **禁止** 長篇大論的開場白。
        *   **長度控制**: 每個回答盡量控制在 **3-4 句話** 或 **3-4 個條列點** 以內。
        *   **飲食建議強制結尾**: 若回答內容涉及「飲食建議」或「能吃什麼」，最後**必須**加上這句話:
            *   「請務必與您的醫師或營養師討論，制定最適合您的個人化飲食計畫。」

    5.  **視覺標記與排版 (Visual Highlights)**:
        *   **紅色警示 (Critical)**: 用 \`[[\` 和 \`]]\` 包起來 (如: [[楊桃]])。
        *   **綠色亮點 (Highlights)**: 用 \`{{\` 和 \`}}\` 包起來 (如: {{鳳山}})。
        *   **互動按鈕**: 用 \`**\` 和 \`**\` 包起來 (如: **預約掛號**)。
        *   請多使用 **條列式** 來整理資訊，避免大段落文字。

    6.  **預約引導**: 若需預約，請直接輸出網址 ${CLINIC_INFO.bookingLink}，不要用 Markdown 語法。
    
    你的任務:
    回答要親切、專業、繁體中文。請確保排版漂亮、清晰、字數精簡，讓長輩也能輕鬆閱讀。
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