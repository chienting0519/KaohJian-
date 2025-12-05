import React from 'react';
import MedicalTeam from '../components/MedicalTeam';

const Team: React.FC = () => {
  return (
    <section className="py-12 bg-white min-h-[80vh]">
      <div className="container mx-auto px-4">
         <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Medical Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">專業醫師團隊</h2>
          <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">由榮總、成大等醫學中心資歷的專科醫師親自看診</p>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <MedicalTeam />
        </div>
      </div>
    </section>
  );
};

export default Team;