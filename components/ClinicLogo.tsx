
import React, { useState } from 'react';

export const ClinicLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  const [imgError, setImgError] = useState(false);

  // 如果圖片讀取失敗 (例如 public 資料夾沒有 logo.webp)，會自動切換顯示下方的備用 SVG
  if (imgError) {
    return (
      // ★★★ 在這裡貼上您的 SVG 代碼 (方法二) ★★★
      // 如果您有設計好的 SVG 程式碼，請直接替換下方的 <svg>...</svg> 整塊內容
      <svg
        viewBox="0 0 500 500"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="高健診所 Logo - 高雄小港腎臟專科"
      >
        <title>高健診所 Logo - 高雄小港腎臟專科</title>
        {/* Background Circle */}
        <circle cx="250" cy="250" r="240" fill="#ffffff" stroke="#155e75" strokeWidth="15" />
        <circle cx="250" cy="250" r="220" fill="#0891b2" />
        
        {/* White Inner Circle/Glow */}
        <circle cx="250" cy="220" r="130" fill="#ffffff" opacity="0.95" />

        {/* Green Hills (Stylized) */}
        <path d="M 50 330 Q 150 290 250 330 T 450 330 L 450 400 Q 250 480 50 400 Z" fill="#65a30d" />
        <path d="M 80 400 Q 250 450 420 400" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
        <path d="M 100 440 Q 250 480 400 440" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.6" />

        {/* Kidney Icon (Left) */}
        <path 
          d="M 190 250 C 150 250 140 200 160 170 C 180 140 220 140 230 180 C 235 200 220 250 190 250 Z" 
          fill="#155e75" 
          stroke="#155e75" 
          strokeWidth="5"
        />
        <path d="M 175 180 Q 165 190 170 210" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

        {/* Kidney Icon (Right) */}
        <path 
          d="M 310 250 C 350 250 360 200 340 170 C 320 140 280 140 270 180 C 265 200 280 250 310 250 Z" 
          fill="#155e75" 
          stroke="#155e75" 
          strokeWidth="5"
        />
        <path d="M 325 180 Q 335 190 330 210" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

        {/* Central Dialysis/Medical Rod */}
        <rect x="242" y="100" width="16" height="300" rx="8" fill="#155e75" />
        <circle cx="250" cy="90" r="10" fill="#155e75" />
        <path d="M 200 110 Q 250 140 300 110" fill="none" stroke="#155e75" strokeWidth="8" strokeLinecap="round" />

        {/* Connecting Tubes */}
        <path d="M 220 240 Q 220 280 235 280 L 235 380" fill="none" stroke="#155e75" strokeWidth="6" />
        <path d="M 280 240 Q 280 265 280 L 265 380" fill="none" stroke="#155e75" strokeWidth="6" />

        {/* Stars/Sparkles */}
        <path d="M 120 180 L 125 195 L 140 200 L 125 205 L 120 220 L 115 205 L 100 200 L 115 195 Z" fill="#ffffff" />
        <path d="M 380 180 L 385 195 L 400 200 L 385 205 L 380 220 L 375 205 L 360 200 L 375 195 Z" fill="#ffffff" />
        <path d="M 140 260 L 143 270 L 153 273 L 143 276 L 140 286 L 137 276 L 127 273 L 137 270 Z" fill="#ffffff" />
        <path d="M 360 260 L 363 270 L 373 273 L 363 276 L 360 286 L 357 276 L 347 273 L 357 270 Z" fill="#ffffff" />
      </svg>
    );
  }

  return (
    <img 
      // ★★★ (方法一) 請將您的 Logo 檔案命名為 logo.webp 並放入 public 資料夾 ★★★
      src="/logo.webp" 
      alt="高健診所 Logo - 高雄小港腎臟專科" 
      className={`${className} object-contain rounded-full`}
      onError={() => setImgError(true)} // 圖片讀取失敗時觸發，轉為顯示上方的 SVG
    />
  );
};
