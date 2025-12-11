import React from 'react';
import { ServiceItem } from '../types';
import { Activity, Stethoscope, ClipboardList, ShieldCheck } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-10 h-10 text-cyan-600" />;
      case 'Stethoscope': return <Stethoscope className="w-10 h-10 text-cyan-600" />;
      case 'ClipboardList': return <ClipboardList className="w-10 h-10 text-cyan-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-10 h-10 text-cyan-600" />;
      default: return <Activity className="w-10 h-10 text-cyan-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full group hover:-translate-y-1">
      <div className="p-8 border-b border-slate-50 bg-gradient-to-br from-cyan-50/50 to-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3.5 bg-white rounded-xl shadow-sm border border-cyan-100 group-hover:border-cyan-200 transition-colors">
            {getIcon(service.icon)}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-900 group-hover:text-cyan-700 transition-colors">{service.title}</h3>
        </div>
        <p className="text-slate-600 text-base sm:text-lg mt-2 leading-relaxed font-bold">{service.description}</p>
      </div>
      <div className="p-8 flex-grow bg-white">
        <ul className="space-y-4">
          {service.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-700 group/item">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-lime-400 mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform shadow-sm" />
              <span className="leading-relaxed text-base font-bold">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;