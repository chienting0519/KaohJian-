
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Stethoscope, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { LayoutContext } from '../components/Layout';

const Home: React.FC = () => {
  const { setIsChatOpen } = useContext(LayoutContext);

  return (
    <>
      <SEO 
        title="高健診所 | 高雄小港腎臟專科 • 洗腎中心 • 糖尿病高血壓治療 (鳳山/林園/大寮/前鎮首選)" 
        description="高雄小港區沿海一路診所推薦。高健診所(KHJ Clinic)專精血液透析(洗腎)、腎臟科檢查。提供小港、鳳山、林園、大寮、前鎮地區溫馨接送服務。鄰近高雄國際機場站，停車方便，是您最信賴的腎臟專科團隊。" 
      />
      <section className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900 text-white min-h-[calc(100vh-144px)] flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-200 mb-8 tracking-wider animate-in fade-in slide-in-from-bottom-5 duration-700">
              小港在地的專業依靠，守護腎臟健康
            </h3>
            
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <h2 className="text-4xl sm:text-7xl lg:text-8xl font-bold leading-tight">
                  高雄市民的健康<br />
                  交給高健診所
                </h2>
            </div>
            
            {/* Desktop Location Display */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 text-4xl font-bold text-lime-300 mb-10 tracking-wide animate-in fade-in duration-700 delay-200">
              <span>鳳山</span>
              <span className="text-cyan-400 text-lg">•</span>
              <span>小港</span>
              <span className="text-cyan-400 text-lg">•</span>
              <span>林園</span>
              <span className="text-cyan-400 text-lg">•</span>
              <span>大寮</span>
              <span className="text-cyan-400 text-lg">•</span>
              <span>前鎮</span>
            </div>

            {/* Mobile Location Display (Stacked) */}
            <div className="flex sm:hidden flex-col items-center justify-center gap-2 text-3xl font-bold text-lime-300 mb-10 tracking-wide animate-in fade-in duration-700 delay-200">
                <div className="flex items-center gap-4">
                  <span>鳳山</span>
                  <span className="text-cyan-400 text-lg">•</span>
                  <span>小港</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>林園</span>
                  <span className="text-cyan-400 text-lg">•</span>
                  <span>大寮</span>
                </div>
                <div>
                  <span>前鎮</span>
                </div>
            </div>

            <div className="flex justify-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <p className="text-2xl lg:text-3xl text-cyan-50 leading-relaxed font-light text-left inline-block">
                結合醫學中心等級的透析技術與社區診所的溫馨照護。<br className="hidden sm:block" />
                我們提供全方位的腎臟專科診療，讓您在舒適環境中重拾健康活力。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mb-8 items-center justify-center animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <Link 
                to="/checkup" 
                className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-lime-500/30 text-center transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-4 ring-2 ring-white/20"
              >
                <ClipboardCheck className="w-9 h-9 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="leading-none mb-1.5">立即檢測腎臟健康</span>
                  <span className="text-base text-white/90 font-bold">一分鐘自我檢測</span>
                </div>
              </Link>
              
              <Link 
                to="/services" 
                className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-4"
              >
                <Stethoscope className="w-9 h-9 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="leading-none mb-1.5">了解服務項目</span>
                  <span className="text-base text-cyan-100 font-bold">專業醫療照護</span>
                </div>
              </Link>
              
              <div className="w-full sm:w-auto">
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg shadow-cyan-500/30 text-center transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-4 ring-2 ring-white/20"
                  >
                    <MessageCircle className="w-9 h-9 flex-shrink-0" />
                    <div className="flex flex-col items-start text-left">
                        <span className="leading-none mb-1.5">諮詢高健 AI 助理</span>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500"></span>
                            </span>
                            <span className="text-base text-lime-100 font-bold">了解健康資訊</span>
                        </div>
                    </div>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;