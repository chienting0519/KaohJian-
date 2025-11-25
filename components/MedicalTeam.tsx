import React from 'react';
import { MEDICAL_TEAM } from '../constants';
import { Stethoscope, Award, Building2, Medal, UserRound } from 'lucide-react';

const MedicalTeam: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {MEDICAL_TEAM.map((doctor, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 flex-shrink-0 overflow-hidden">
                 {/* Generic Icon Avatar */}
                 <UserRound className="w-14 h-14 text-white/90" />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-2xl font-bold tracking-wide">{doctor.name}</h3>
                  <span className="bg-lime-400 text-cyan-900 text-xs px-2 py-0.5 rounded font-bold shadow-sm">{doctor.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-cyan-50">
                   {doctor.specialties.map((spec, i) => (
                     <span key={i} className="flex items-center text-sm font-medium bg-cyan-800/30 px-2 py-0.5 rounded">
                       <Stethoscope className="w-3 h-3 mr-1 text-lime-300" /> {spec}
                     </span>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 flex-1 flex flex-col gap-6 bg-white">
            
            {/* Experience */}
            <div>
              <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 border-l-4 border-cyan-500 pl-3">
                <Building2 className="w-5 h-5 text-cyan-600" />
                專業經歷
              </h4>
              <ul className="space-y-2">
                {doctor.experience.map((exp, i) => (
                  <li key={i} className="text-slate-600 flex items-start text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 mr-2 flex-shrink-0 group-hover:bg-cyan-500 transition-colors"></span>
                    {exp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="mt-auto pt-6 border-t border-slate-50">
              <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 border-l-4 border-lime-500 pl-3">
                <Award className="w-5 h-5 text-lime-600" />
                專業認證
              </h4>
              <ul className="space-y-2">
                {doctor.certifications.map((cert, i) => (
                  <li key={i} className="text-slate-600 flex items-start text-sm md:text-base">
                    <Medal className="w-4 h-4 text-lime-500 mr-2 mt-0.5 flex-shrink-0" />
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