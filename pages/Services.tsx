
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, CLINIC_INFO } from '../constants';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import { Phone, CalendarClock, HelpCircle } from 'lucide-react'; // ★★★ 修正：使用舊版名稱 HelpCircle 以避免匯入錯誤

const Services: React.FC = () => {
  
  const faqList = [
    {
      question: "高健診所有提供洗腎接送服務嗎？",
      answer: "有的。我們提供小港、鳳山、林園、大寮及前鎮地區的溫馨接送服務，協助行動不便的腎友準時往返診所。"
    },
    {
      question: "糖尿病患者需要看腎臟科嗎？",
      answer: "強烈建議定期追蹤。糖尿病是造成洗腎的第一大主因，透過微量白蛋白檢測 (ACR) 與藥物控制，能有效延緩腎功能惡化。"
    },
    {
      question: "洗腎的費用是健保給付嗎？",
      answer: "是的，血液透析治療由健保全額給付。高健診所提供免掛號費的優惠，減輕腎友的長期負擔。"
    }
  ];

  // SEO Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <>
      <SEO 
        title="專業服務項目" 
        description="高健診所提供腎臟專科、一般內科、免費成人健檢、預防醫學等全方位醫療服務。專精蛋白尿、糖尿病、高血壓控制與高品質血液透析。" 
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="py-12 bg-slate-50 relative min-h-[80vh]">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Services</span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">高健診所 專業醫療服務</h1>
            <div className="w-24 h-1.5 bg-lime-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              我們不只治療疾病，更重視預防與生活品質。<br/>
              從<span className="text-cyan-700 font-bold">血液透析</span>到<span className="text-cyan-700 font-bold">慢性病管理</span>，提供您最完整的腎臟照護。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {SERVICES.map((service, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full" style={{ animationDelay: `${index * 100}ms` }}>
                  <ServiceCard service={service} />
              </div>
            ))}
          </div>

          {/* ★★★ 補回這個視覺區塊 (這就是您漏掉的部分) ★★★ */}
          <div className="max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10">
             <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-800 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                   <HelpCircle className="w-4 h-4" />
                   常見問答
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">關於就診與服務的疑問</h2>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
                {faqList.map((faq, idx) => (
                   <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-cyan-200 transition-all hover:shadow-md">
                      <h3 className="font-bold text-cyan-900 text-lg mb-3 flex items-start gap-3">
                         <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded mt-1 font-extrabold">Q</span>
                         {faq.question}
                      </h3>
                      <p className="text-slate-600 leading-relaxed pl-9 text-justify">{faq.answer}</p>
                   </div>
                ))}
             </div>
          </div>

          {/* 底部 CTA */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100 text-center animate-in fade-in slide-in-from-bottom-10">
             <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                需要更詳細的診療建議嗎？
             </h2>
             <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                我們的醫療團隊隨時準備為您服務。無論是洗腎諮詢、成人健檢或是慢性病處方箋，都歡迎您直接聯繫。
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/schedule" className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:-translate-y-1">
                   <CalendarClock className="w-5 h-5" /> 查看門診時間
                </Link>
                <a href={`tel:${CLINIC_INFO.phone}`} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-cyan-400 text-slate-600 hover:text-cyan-700 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1">
                   <Phone className="w-5 h-5" /> 撥打預約專線
                </a>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Services;
