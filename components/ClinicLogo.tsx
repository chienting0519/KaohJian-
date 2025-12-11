
import React from 'react';

export const ClinicLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <img 
      src="/logo.webp" 
      alt="高健診所 Logo - 高雄小港腎臟專科" 
      className={`${className} object-cover rounded-full`}
    />
  );
};
