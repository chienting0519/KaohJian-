
import React from 'react';
import { KAOHSIUNG_CLINICS_LIST } from '../constants';
import SEO from '../components/SEO';

const ClinicsList: React.FC = () => {
  return (
    <>
      <SEO 
        title="高雄市洗腎醫療院所名冊" 
        description="完整收錄高雄市小港、鳳山、林園、大寮、前鎮等地區之洗腎中心與腎臟科診所聯絡資訊名冊。" 
      />
      <section className="py-12 bg-slate-50 min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Clinics List</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">高雄市洗腎醫療院所名冊</h2>
            <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead className="bg-cyan-50">
                  <tr>
                    <th className="p-4 font-bold text-cyan-900 border-b border-cyan-100 whitespace-nowrap">醫院名稱</th>
                    <th className="p-4 font-bold text-cyan-900 border-b border-cyan-100 whitespace-nowrap">地址</th>
                    <th className="p-4 font-bold text-cyan-900 border-b border-cyan-100 whitespace-nowrap">電話</th>
                  </tr>
                </thead>
                <tbody>
                  {KAOHSIUNG_CLINICS_LIST.map((clinic, index) => {
                    const isTarget = clinic.name === '高健診所';
                    return (
                      <tr key={index} className={`border-b border-slate-50 transition-colors ${isTarget ? 'bg-cyan-50/50 hover:bg-cyan-50' : 'hover:bg-slate-50'}`}>
                        <td className={`p-4 ${isTarget ? 'font-bold text-cyan-800 text-lg' : 'text-slate-300 font-medium'}`}>{clinic.name}</td>
                        <td className={`p-4 ${isTarget ? 'text-slate-700 font-medium' : 'text-slate-200'}`}>{clinic.address}</td>
                        <td className={`p-4 whitespace-nowrap ${isTarget ? 'text-slate-700 font-bold' : 'text-slate-200'}`}>{clinic.phone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClinicsList;