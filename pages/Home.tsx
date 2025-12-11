import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Stethoscope, ArrowRight, MapPin, Phone } from 'lucide-react'; // 新增 icon
import SEO from '../components/SEO';
import { LayoutContext } from '../components/Layout';
import { DoctorIcon } from '../components/DoctorIcon';
import { CLINIC_INFO } from '../constants'; // 引入常數

const Home: React.FC = () => {
  const { setIsChatOpen } = useContext(LayoutContext);

  return (
    <>
      <SEO 
        title="高健診所 | 高雄小港腎臟專科 • 洗腎中心 • 糖尿病高血壓治療" 
        description="高雄小港高健診所(KHJ Clinic)位於沿海一路，專精血液透析(洗腎)、糖尿病與高血壓治療。提供小港、鳳山、林園、大寮、前鎮等地區的免費溫馨接送服務，是南高雄腎友最推薦的洗腎中心與腎臟專科診所。" 
      />
      
      {/* --- Hero Section (主視覺區) --- */}
      <section className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900 text-white min-h-[calc(100vh-144px)] flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* [SEO 修正 1] 將副標題加上語意標籤，強調在地化 */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-200 mb-6 tracking-wider animate-in fade-in slide-in-from-bottom-5 duration-700">
              高雄小港 • 腎臟專科 • 血液透析中心
            </h2>
            
            {/* [SEO 修正 2] 這是最重要的 H1，必須包含診所名稱與核心服務 */}
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight drop-shadow-lg">
                  守護您的腎臟健康<br />
                  <span className="text-lime-400">高健診所</span> 專業團隊
                </h1>
            </div>
            
            {/* 服務區域顯示 */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 text-2xl lg:text-3xl font-bold text-white/90 mb-10 tracking-wide animate-in fade-in duration-700 delay-200 bg-white/10 py-3 px-8 rounded-full backdrop-blur-sm inline-flex border border-white/20">
              <span className="flex items-center gap-2"><MapPin className="w-6 h-6 text-lime-400" /> 溫馨接送服務：</span>
              <span>鳳山</span>•<span>小港</span>•<span>林園</span>•<span>大寮</span>•<span>前鎮</span>
            </div>

            {/* Mobile Location Display */}
            <div className="flex sm:hidden flex-col items-center justify-center gap-2 text-xl font-bold text-lime-300 mb-10 tracking-wide animate-in fade-in duration-700 delay-200">
                <p className="text-white text-sm mb-1 opacity-80">溫馨接送服務</p>
                <div className="flex items-center gap-3">
                  <span>鳳山</span>•<span>小港</span>•<span>林園</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>大寮</span>•<span>前鎮</span>
                </div>
            </div>

            {/* CTA 按鈕群組 */}
            <div className="flex flex-col sm:flex-row gap-5 mb-12 items-center justify-center animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <Link 
                to="/checkup" 
                className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-lime-500/30 text-center transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-4 ring-2 ring-white/20"
              >
                <ClipboardCheck className="w-8 h-8 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="leading-none mb-1 text-sm opacity-90">一分鐘自我檢測</span>
                  <span className="text-lg">腎臟健康檢查</span>
                </div>
              </Link>
              
              <Link 
                to="/services" 
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-4 backdrop-blur-sm"
              >
                <Stethoscope className="w-8 h-8 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="leading-none mb-1 text-sm text-cyan-200">專業醫療照護</span>
                  <span className="text-lg">了解服務項目</span>
                </div>
              </Link>
              
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg shadow-cyan-900/50 text-center transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-4 ring-2 ring-white/20"
              >
                <div className="w-10 h-10 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <DoctorIcon className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-start text-left">
                    <span className="leading-none mb-1 text-sm text-cyan-200">有疑問嗎？</span>
                    <span className="text-lg">詢問 AI 醫師助理</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- [SEO 新增區塊] 診所介紹與權威性建立 --- */}
      {/* 這個區塊是為了增加首頁的文字密度，讓 Google 抓取到更多關鍵字 */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* 文字介紹 */}
              <div className="space-y-6">
                 <div className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-bold mb-2">
                    關於高健診所
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    結合醫學中心等級技術<br/>
                    與社區診所的<span className="text-lime-600">溫馨便利</span>
                 </h2>
                 <p className="text-slate-600 text-lg leading-relaxed text-justify">
                    <strong>高健診所</strong> 深耕高雄小港多年，由前榮總、成大醫院腎臟專科醫師團隊駐診。我們深知腎友在治療過程中的身心壓力，因此致力於打造一個「不像醫院的診所」。
                 </p>
                 <p className="text-slate-600 text-lg leading-relaxed text-justify">
                    我們引進德國原裝高階透析設備與雙重 RO 純水處理系統，確保<strong>血液透析 (洗腎)</strong> 的品質與安全。同時，針對<strong>糖尿病</strong>與<strong>高血壓</strong>患者，我們提供整合性的慢性病照護網，從飲食衛教到藥物控制，協助您延緩腎功能惡化。
                 </p>
                 
                 <div className="pt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-slate-700 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                       <MapPin className="w-5 h-5 text-cyan-600" />
                       高雄市小港區沿海一路88號
                    </div>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-2 text-slate-700 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 hover:bg-cyan-50 hover:text-cyan-700 transition-colors">
                       <Phone className="w-5 h-5 text-cyan-600" />
                       預約專線：{CLINIC_INFO.phone}
                    </a>
                 </div>

                 <div className="pt-6">
                    <Link to="/team" className="inline-flex items-center text-cyan-700 font-bold hover:translate-x-1 transition-transform">
                       認識我們的醫療團隊 <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                 </div>
              </div>

              {/* 右側特色卡片 (增加視覺豐富度與關鍵字) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-cyan-900 mb-2">血液透析中心</h3>
                    <p className="text-slate-600">配備個人電視與床單棉被，提供寬敞舒適的洗腎環境。</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-cyan-900 mb-2">溫馨接送服務</h3>
                    <p className="text-slate-600">服務範圍涵蓋小港、鳳山、林園、大寮、前鎮等區域。</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-cyan-900 mb-2">慢性病照護</h3>
                    <p className="text-slate-600">糖尿病、高血壓、高血脂整合治療，定期追蹤腎功能。</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-cyan-900 mb-2">免費成人健檢</h3>
                    <p className="text-slate-600">提供40歲以上民眾免費健康檢查，早期發現潛在風險。</p>
                 </div>
              </div>

           </div>
        </div>
      </section>
    </>
  );
};

export default Home;