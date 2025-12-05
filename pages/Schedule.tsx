import React from 'react';
import ScheduleTables from '../components/ScheduleTables';

const Schedule: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50/50 min-h-[80vh]">
       <div className="container mx-auto px-4">
         <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Outpatient & Dialysis Hours</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">門診與透析時間</h2>
          <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ScheduleTables />
        </div>
       </div>
    </section>
  );
};

export default Schedule;