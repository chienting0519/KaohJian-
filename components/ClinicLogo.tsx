import React from 'react';

export const ClinicLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <img 
    src="/logo.webp" 
    alt="高健診所 Logo" 
    className={`${className} object-contain`} // object-contain 確保圖片不會變形
  />
);