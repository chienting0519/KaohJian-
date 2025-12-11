import React from 'react';
import { Link } from 'react-router-dom'; // 新增 Link
import { SERVICES, CLINIC_INFO } from '../constants';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import { ArrowRight, Phone, CalendarClock } from 'lucide-react'; // 新增 Icon

const Services: React.FC = () => {
  
  // ★★★ SEO 加強：注入 FAQ Schema (常見問答) ★★★
  // 這會讓 Google 搜尋結果有機會直接顯示這些問答
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "高健診所有提供洗腎接送服務嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "有的。我們提供小港、鳳山、林園、大寮及前鎮地區的溫馨接送服務，協助行動不便的腎友準時往返診所。"
        }
      },
      {
        "@type": "Question",
        "name": "糖尿病患者需要看腎臟科嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "強烈建議定期追蹤。糖尿病是造成洗腎的第一大主因，透過微量白蛋白檢測 (ACR) 與藥物控制，能有效延緩腎功能惡化。"
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="專業服務項目" 
        description="高健診所提供腎臟專科、一般內科、免費成人健檢、預防醫學等全方位醫療服務。專精蛋白尿、糖尿病、高血壓控制與高品質血液透析。" 
      />
      {/* 注入 Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="py-12 bg-slate-50 relative min-h-[80vh]">
        <div className="container mx-auto px-4">
          
          {/* Header 區塊 */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Services</span>
            {/* [SEO 修改] 改為 H1 標籤 */}
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
              高健診所 專業醫療服務
            </h1>
            <div className="w-24 h-1.5 bg-lime-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              我們不只治療疾病，更重視預防與生活品質。<br/>
              從<span className="text-cyan-700 font-bold">血液透析</span>到<span className="text-cyan-700 font-bold">慢性病管理</span>，提供您最完整的腎臟照護。
            </p>
          </div>

          {/* 服務卡片列表 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {SERVICES.map((service, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full" style={{ animationDelay: `${index * 100}ms` }}>
                  <ServiceCard service={service} />
              </div>
            ))}
          </div>

          {/* [SEO 修改] 新增底部 CTA 導流區塊 (降低跳出率) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100 text-center animate-in fade-in slide-in-from-bottom-10">
             <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                需要更詳細的診療建議嗎？
             </h2>
             <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                我們的醫療團隊隨時準備為您服務。無論是洗腎諮詢、成人健檢或是慢性病處方箋，都歡迎您直接聯繫。
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/schedule" 
                  className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:-translate-y-1"
                >
                   <CalendarClock className="w-5 h-5" />
                   查看門診時間
                </Link>
                <a 
                  href={`tel:${CLINIC_INFO.phone}`} 
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-cyan-400 text-slate-600 hover:text-cyan-700 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1"
                >
                   <Phone className="w-5 h-5" />
                   撥打預約專線
                </a>
             </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Services; 