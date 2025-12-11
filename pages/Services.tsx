import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, CLINIC_INFO } from '../constants';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import { Phone, CalendarClock, HelpCircle, CheckCircle2 } from 'lucide-react';

const Services: React.FC = () => {
  
  const faqList = [
    {
      question: "高健診所有提供洗腎接送服務嗎？範圍是哪裡？",
      answer: "有的。高健診所提供免費的洗腎溫馨接送服務。我們的專車服務範圍涵蓋：高雄市小港區、鳳山區、林園區、大寮區及前鎮區。我們致力於解決腎友的交通難題，讓您風雨無阻安心就診。"
    },
    {
      question: "我有糖尿病，需要定期看腎臟科嗎？",
      answer: "強烈建議定期追蹤。統計顯示，台灣洗腎患者中有超過 45% 是由糖尿病引起的（糖尿病腎病變）。透過定期檢測「微量白蛋白 (ACR)」與「腎絲球過濾率 (eGFR)」，配合藥物控制，能有效延緩腎功能惡化，避免走上洗腎之路。"
    },
    {
      question: "洗腎費用多少？健保有給付嗎？",
      answer: "在台灣，血液透析（洗腎）屬於健保全額給付的重大傷病項目。持有重大傷病卡的腎友，在高健診所接受透析治療免部分負擔。我們更提供免掛號費優惠，希望能減輕腎友長期的經濟壓力。"
    }
    {
    question: "免費成人健檢的資格是什麼？幾歲可以做？",
    answer: "依據國健署最新擴大補助方案，年滿 30 歲即可享有免費健檢服務！30-39 歲民眾每 3 年補助一次，40-64 歲每 3 年一次，65 歲以上每年一次。請攜帶健保卡至高健診所櫃台辦理。"
  },
  ];

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
        title="醫療服務項目 | 血液透析 • 成人健檢 • 慢性病治療" 
        description="高健診所提供全方位腎臟醫療服務：高品質血液透析(洗腎)、糖尿病與高血壓共照網、痛風治療、免費成人健檢及大腸癌篩檢。小港鳳山地區首選。" 
        keywords="血液透析,洗腎中心,高雄成人健檢,糖尿病共照網,高血壓治療,痛風飲食,腎臟病前兆"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="py-12 bg-slate-50 relative min-h-[80vh]">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Medical Services</span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">高健診所 專業醫療項目</h1>
            <div className="w-24 h-1.5 bg-lime-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              我們引進與醫學中心同等級的透析設備，並結合社區診所的便利性。<br/>
              從<span className="text-cyan-700 font-bold">血液透析</span>到<span className="text-cyan-700 font-bold">三高慢性病管理</span>，提供您最完整的腎臟照護。
            </p>
          </div>

          {/* 服務卡片區 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
            {SERVICES.map((service, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full" style={{ animationDelay: `${index * 100}ms` }}>
                  <ServiceCard service={service} />
              </div>
            ))}
          </div>

          {/* ★★★ SEO 強化內容區塊 (增加文字密度與長尾關鍵字) ★★★ */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 animate-in fade-in slide-in-from-bottom-10">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-cyan-900 mb-6 flex items-center gap-3">
                   <CheckCircle2 className="w-6 h-6 text-lime-500" />
                   血液透析中心特色
                </h2>
                <ul className="space-y-4 text-slate-600 text-lg">
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>德國原裝設備：</strong>全院採用 Fresenius 4008S/5008S 高階洗腎機，提供穩定的透析品質。</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>雙重 RO 純水：</strong>定期檢測水質內毒素，確保透析用水純淨安全，減少發炎反應。</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>個人化空間：</strong>每床配備專屬電視，環境寬敞明亮，讓洗腎過程更放鬆舒適。</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>不斷電系統：</strong>備有大型發電機，即使颱風停電也能確保治療不中斷。</p>
                   </li>
                </ul>
             </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-cyan-900 mb-2">免費成人健檢</h3>
                  <p className="text-slate-600">最新政策受惠族群擴大！
                    <strong>滿 30 歲</strong>即可檢查。包含血糖、血脂、肝腎功能與尿蛋白檢測。
                  </p>
              </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-cyan-900 mb-6 flex items-center gap-3">
                   <CheckCircle2 className="w-6 h-6 text-lime-500" />
                   內科與慢性病照護
                </h2>
                <ul className="space-y-4 text-slate-600 text-lg">
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>糖尿病共同照護網：</strong>提供營養衛教、眼底檢查轉診與足部護理指導。</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>高血壓/高血脂：</strong>精準藥物調整，預防中風與心肌梗塞併發症。</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>痛風與高尿酸：</strong>急性期消炎止痛與長期降尿酸治療，保護腎臟功能。</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p><strong>一般內科：</strong>感冒、腸胃炎、過敏、皮膚疾病等常見問題診療。</p>
                   </li>
                </ul>
             </div>
          </div>

          {/* FAQ 區塊 */}
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