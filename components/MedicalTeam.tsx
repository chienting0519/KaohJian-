import React from 'react';
import { MEDICAL_TEAM } from '../constants';
import { Stethoscope, Award, Building2, Medal, UserRound } from 'lucide-react';

const MedicalTeam: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {MEDICAL_TEAM.map((doctor, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            
            {/* Avatar & Name Container - Flex Row to keep them side-by-side */}
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 relative z-10 w-full">
              {/* Avatar - Reduced size as requested */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 flex-shrink-0 overflow-hidden shadow-inner">
                 <UserRound className="w-12 h-12 sm:w-16 sm:h-16 text-white/90" />
              </div>
              
              {/* Doctor Info */}
              <div className="flex flex-col items-start text-left min-w-0">
                {/* Name and Title Row - Always side-by-side, no wrapping for name/title */}
                <div className="flex flex-row items-center gap-3 mb-2">
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-wide leading-none whitespace-nowrap">
                    {doctor.name}
                  </h3>
                  <span className="bg-lime-400 text-cyan-900 text-base sm:text-lg px-3 py-1 rounded font-bold shadow-sm whitespace-nowrap flex-shrink-0">
                    {doctor.title}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 text-cyan-50 mt-1">
                   {doctor.specialties.map((spec, i) => (
                     <span key={i} className="flex items-center text-sm sm:text-base font-medium bg-cyan-800/30 px-2 py-0.5 rounded border border-cyan-500/30">
                       <Stethoscope className="w-3.5 h-3.5 mr-1 text-lime-300" /> {spec}
                     </span>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-8 flex-1 flex flex-col gap-8 bg-white">
            
            {/* Experience & Certifications */}
            <div>
              <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-3 text-xl sm:text-2xl">
                <Building2 className="w-6 h-6 text-cyan-600" />
                專業經歷
              </h4>
              <ul className="space-y-3">
                {doctor.experience.map((exp, i) => (
                  <li key={i} className="text-slate-600 flex items-start text-base sm:text-lg font-bold leading-relaxed">
                    <span className="w-2 h-2 bg-slate-300 rounded-full mt-2.5 mr-3 flex-shrink-0 group-hover:bg-cyan-500 transition-colors"></span>
                    {exp}
                  </li>
                ))}
                {/* Append Certifications here */}
                {doctor.certifications.map((cert, i) => (
                  <li key={`cert-${i}`} className="text-slate-600 flex items-start text-base sm:text-lg font-bold leading-relaxed">
                    <Medal className="w-5 h-5 text-lime-500 mr-3 mt-1 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicalTeam;