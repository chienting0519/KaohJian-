import React from 'react';
import { SERVICES } from '../constants';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  return (
    <>
      <SEO 
        title="專業服務項目" 
        description="高健診所提供腎臟專科、一般內科、免費成人健檢、預防醫學等全方位醫療服務。專精蛋白尿、糖尿病、高血壓控制。" 
      />
      <section className="py-12 bg-slate-50 relative min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">專業醫療服務項目</h2>
            <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                  <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;