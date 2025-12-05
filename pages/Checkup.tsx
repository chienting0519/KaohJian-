import React from 'react';
import KidneyCheck from '../components/KidneyCheck';

const Checkup: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-cyan-900 to-cyan-800 text-white relative overflow-hidden min-h-[calc(100vh-144px)] flex items-center">
       <div className="absolute top-0 left-0 w-full h-full opacity-10 pattern-dots"></div>
       <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">腎臟健康自我檢測</h2>
             <p className="text-cyan-100 max-w-2xl mx-auto text-lg">
               腎臟病初期往往沒有明顯症狀，透過簡單的自我評估，提早發現潛在風險。
             </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <KidneyCheck />
          </div>
       </div>
    </section>
  );
};

export default Checkup;