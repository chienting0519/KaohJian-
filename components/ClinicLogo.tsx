import React from 'react';

export const ClinicLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logoTitle">
    <title id="logoTitle">高健診所 Logo</title>
    <defs>
      <clipPath id="circleClip">
        <circle cx="100" cy="100" r="90" />
      </clipPath>
    </defs>
    
    {/* Content masked by circle */}
    <g clipPath="url(#circleClip)">
        {/* Sky Background - White */}
        <rect width="200" height="200" fill="white" />
        
        {/* Sun/Halo Effect behind kidneys - Light Cyan */}
        <circle cx="100" cy="90" r="60" fill="#ecfeff" />

        {/* Hills - Background Light Green */}
        <path d="M -10 130 C 40 120 80 140 100 140 C 130 140 170 120 210 130 V 210 H -10 Z" fill="#bef264" />
        
        {/* Hills - Foreground Darker Green */}
        <path d="M -10 150 C 50 140 90 160 120 160 C 160 160 180 140 210 150 V 210 H -10 Z" fill="#65a30d" />
        
        {/* Winding Path - White stroke */}
        <path d="M 70 210 C 70 210 90 150 110 150 C 130 150 150 210 150 210" stroke="white" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9" />
        
        {/* Pole - Dark Teal */}
        <rect x="94" y="25" width="12" height="180" fill="#155e75" rx="4" />
        
        {/* Pole Hanger Top - T Shape */}
        <path d="M 65 45 C 65 25 135 25 135 45" stroke="#155e75" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="65" cy="45" r="5" fill="#155e75" />
        <circle cx="135" cy="45" r="5" fill="#155e75" />
        <rect x="90" y="30" width="20" height="10" fill="#155e75" />

        {/* Left Kidney */}
        <path d="M 88 80 C 60 65 35 90 42 120 C 48 145 70 150 88 120" fill="#155e75" stroke="#fff" strokeWidth="2" />
        {/* Highlight on Left Kidney */}
        <path d="M 50 95 Q 52 85 62 87" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>

        {/* Right Kidney */}
        <path d="M 112 80 C 140 65 165 90 158 120 C 152 145 130 150 112 120" fill="#155e75" stroke="#fff" strokeWidth="2" />
        {/* Highlight on Right Kidney */}
        <path d="M 150 95 Q 148 85 138 87" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
        
        {/* Tubing connecting kidneys to pole - Thinner lines */}
        <path d="M 96 115 L 88 120" stroke="#155e75" strokeWidth="4" strokeLinecap="round" />
        <path d="M 104 115 L 112 120" stroke="#155e75" strokeWidth="4" strokeLinecap="round" />

        {/* Sparkles - Teal (Matching the Logo Color) */}
        <g fill="#155e75">
            {/* Left Sparkles */}
            <path d="M 25 100 L 29 90 L 33 100 L 29 110 Z" />
            <path d="M 38 75 L 40 68 L 42 75 L 40 82 Z" opacity="0.8"/>
            
            {/* Right Sparkles */}
            <path d="M 175 100 L 179 90 L 183 100 L 179 110 Z" />
            <path d="M 162 75 L 164 68 L 166 75 L 164 82 Z" opacity="0.8"/>
        </g>
    </g>

    {/* Outer Ring Border - Thick Teal */}
    <circle cx="100" cy="100" r="90" stroke="#155e75" strokeWidth="10" fill="none" />
  </svg>
);