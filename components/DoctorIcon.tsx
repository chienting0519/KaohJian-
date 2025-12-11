
import React, { useState } from 'react';

export const DoctorIcon = ({ className = "w-full h-full" }: { className?: string }) => {
  const [imgError, setImgError] = useState(false);

  // 優先嘗試顯示 logo.webp (與 Loading 呼吸燈畫面一致)
  if (!imgError) {
    return (
      <img
        src="/logo.webp"
        alt="高健診所 AI 助理"
        // 加上 rounded-full 以保持原本 SVG 的圓形頭像外觀
        className={`${className} object-cover rounded-full`}
        onError={() => setImgError(true)}
      />
    );
  }

  // 圖片讀取失敗時，顯示備用 SVG 醫師圖示
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="醫師頭像"
    >
      {/* 圓形背景 */}
      <circle cx="50" cy="50" r="50" className="fill-cyan-100" />
      
      {/* 身體/白袍 */}
      <mask id="circleMask">
         <circle cx="50" cy="50" r="50" fill="white" />
      </mask>
      <g mask="url(#circleMask)">
        {/* 襯衫 */}
        <path d="M20 90L50 60L80 90V110H20V90Z" fill="#bae6fd" />
        
        {/* 白袍領口 */}
        <path d="M50 60L20 95H80L50 60Z" fill="white" />
        <path d="M15 100C15 80 30 65 50 65C70 65 85 80 85 100" fill="white" />
        
        {/* 領帶 */}
        <path d="M50 65L45 70L50 100L55 70L50 65Z" className="fill-cyan-700" />
      </g>

      {/* 脖子 */}
      <rect x="40" y="45" width="20" height="15" className="fill-[#ffdec8]" />

      {/* 臉部 */}
      <circle cx="50" cy="40" r="22" className="fill-[#ffdec8]" />

      {/* 耳朵 */}
      <circle cx="29" cy="42" r="4" className="fill-[#ffdec8]" />
      <circle cx="71" cy="42" r="4" className="fill-[#ffdec8]" />

      {/* 頭髮 (修復版 - 更穩固的路徑) */}
      <path
        d="M28 44
           C 28 22, 36 12, 50 12
           C 64 12, 72 22, 72 44
           V 46
           Q 72 36, 64 30
           Q 56 24, 50 24
           Q 38 24, 28 38
           V 46
           Z"
        className="fill-slate-700"
      />

      {/* 五官 */}
      {/* 眼鏡 */}
      <g className="stroke-slate-700" strokeWidth="1.5" fill="none">
        <circle cx="43" cy="42" r="6" fill="rgba(255,255,255,0.3)" />
        <circle cx="57" cy="42" r="6" fill="rgba(255,255,255,0.3)" />
        <path d="M49 42H51" /> {/* 鼻樑架 */}
        <path d="M37 42L29 40" /> {/* 鏡腳左 */}
        <path d="M63 42L71 40" /> {/* 鏡腳右 */}
      </g>
      
      {/* 眼睛 */}
      <circle cx="43" cy="42" r="1.5" className="fill-slate-800" />
      <circle cx="57" cy="42" r="1.5" className="fill-slate-800" />
      
      {/* 微笑嘴巴 */}
      <path d="M46 52Q50 55 54 52" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* 聽診器 */}
      <path d="M30 100V85C30 75 40 70 40 70" className="stroke-slate-400" strokeWidth="2" fill="none" />
      <path d="M70 100V85C70 75 60 70 60 70" className="stroke-slate-400" strokeWidth="2" fill="none" />
      <path d="M40 70C40 70 45 75 50 75C55 75 60 70 60 70" className="stroke-slate-400" strokeWidth="2" fill="none" />
      <circle cx="50" cy="78" r="3" className="fill-slate-300 stroke-slate-400" strokeWidth="1" />
    </svg>
  );
};

export default DoctorIcon;
