import React, { useEffect } from 'react';
import MedicalTeam from '../components/MedicalTeam';
import SEO from '../components/SEO';
import { MEDICAL_TEAM, CLINIC_INFO } from '../constants';

const Team: React.FC = () => {
  
  // ★★★ 新增：動態注入醫師的結構化資料 (Schema.org) ★★★
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": CLINIC_INFO.name,
      "employee": MEDICAL_TEAM.map(doctor => ({
        "@type": "Physician",
        "name": `醫師 ${doctor.name}`,
        "jobTitle": doctor.title,
        "medicalSpecialty": doctor.specialties.map(s => ({
          "@type": "MedicalSpecialty",
          "name": s
        })),
        "worksFor": {
          "@type": "MedicalClinic",
          "name": CLINIC_INFO.name
        },
        "description": `專長：${doctor.specialties.join('、')}。經歷：${doctor.experience[0]}`
      }))
    };

    const scriptId = 'medical-team-schema';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

    // 離開頁面時清理 (可選，但在 SPA 中保留也無妨)
    return () => {
      // document.head.removeChild(script); 
    };
  }, []);

  return (
    <>
      <SEO 
        title="專業醫師團隊" 
        description="高健診所由洪錦傳院長與吳美美醫師駐診，擁有高雄榮總、成大醫院等醫學中心資深腎臟專科經歷。專精血液透析、糖尿病與高血壓治療。" 
      />
      <section className="py-12 bg-white min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Medical Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">專業醫師團隊</h2>
            <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-bold">
              結合醫學中心等級的專業技術 與 社區診所的溫暖關懷
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <MedicalTeam />
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;