import React from 'react';
import KnowledgeColumn from '../components/KnowledgeColumn';
import SEO from '../components/SEO';

const Knowledge: React.FC = () => {
  return (
    <>
      <SEO 
        title="衛教專欄" 
        description="瀏覽由專業腎臟科醫師撰寫的健康文章。包含洗腎知識、糖尿病控制、高血壓飲食等實用衛教資訊。" 
      />
      <section className="py-12 bg-white min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Health Knowledge</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">衛教專欄</h2>
            <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <KnowledgeColumn />
          </div>
        </div>
      </section>
    </>
  );
};

export default Knowledge;