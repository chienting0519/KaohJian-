
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, MessageCircle, ChevronUp } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from './constants';
import ServiceCard from './components/ServiceCard';
import KidneyCheck from './components/KidneyCheck';
import AIChat from './components/AIChat';
import ScheduleTables from './components/ScheduleTables';
import { ClinicLogo } from './components/ClinicLogo';
import KnowledgeColumn from './components/KnowledgeColumn';
import MedicalTeam from './components/MedicalTeam';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-lime-200 selection:text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" onClick={scrollToTop} className="flex items-center gap-3 group">
              <ClinicLogo className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-105 transition-transform" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-cyan-900 tracking-tight group-hover:text-cyan-700 transition-colors">
                  {CLINIC_INFO.name}
                </h1>
                <p className="text-sm text-slate-500 font-bold tracking-wide">
                  高雄腎臟專科 • 洗腎中心
                </p>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
               {['home', 'services', 'doctors', 'schedule', 'checkup', 'knowledge'].map((item) => {
                  const labels: Record<string, string> = {
                    home: '首頁',
                    services: '服務項目',
                    doctors: '醫療團隊',
                    schedule: '門診時間',
                    checkup: '腎臟檢測',
                    knowledge: '健康新知'
                  };
                  return (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={(e) => scrollToSection(e, item === 'home' ? 'home' : item)}
                      className="px-4 py-2 text-slate-600 font-bold hover:text-cyan-700 hover:bg-cyan-50 rounded-full transition-all text-sm lg:text-base"
                    >
                      {labels[item]}
                    </a>
                  );
               })}
               <a 
                 href={CLINIC_INFO.bookingLink}
                 target="_blank"
                 rel="noreferrer" 
                 className="ml-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-sm hover:shadow-green-200 hover:-translate-y-0.5"
               >
                 預約掛號
               </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col p-4 space-y-2">
              {['home', 'services', 'doctors', 'schedule', 'checkup', 'knowledge'].map((item) => {
                  const labels: Record<string, string> = {
                    home: '首頁',
                    services: '服務項目',
                    doctors: '醫療團隊',
                    schedule: '門診時間',
                    checkup: '腎臟檢測',
                    knowledge: '健康新知'
                  };
                  return (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={(e) => scrollToSection(e, item === 'home' ? 'home' : item)}
                      className="px-4 py-3 text-slate-600 font-bold hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-all"
                    >
                      {labels[item]}
                    </a>
                  );
               })}
               <a 
                 href={CLINIC_INFO.bookingLink}
                 target="_blank"
                 rel="noreferrer" 
                 className="mt-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-4 py-3 rounded-xl font-bold text-center shadow-sm"
               >
                 立即預約掛號
               </a>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        <section id="home" className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900 text-white py-24 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-200 mb-8 tracking-wider">
                小港在地的專業依靠，守護腎臟健康
              </h3>
              
              <div className="mb-10">
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                    高雄市民的健康<br />
                    交給高健診所
                  </h2>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-2xl sm:text-3xl font-bold text-lime-300 mb-10 tracking-wide">
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

              <p className="text-2xl lg:text-3xl text-cyan-50 mb-12 leading-relaxed font-light mx-auto max-w-4xl">
                結合醫學中心等級的透析技術與社區診所的溫馨照護。<br className="hidden sm:block" />
                我們提供全方位的腎臟專科診療，讓您在舒適環境中重拾健康活力。
              </p>
              <div className="flex flex-col sm:flex-row gap-5 mb-14 items-center justify-center">
                 <a href="#checkup" onClick={(e) => scrollToSection(e, 'checkup')} className="w-full sm:w-auto bg-lime-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-lime-600 transition-all shadow-lg hover:shadow-lime-500/30 text-center transform hover:-translate-y-1 cursor-pointer">
                   立即檢測腎臟健康
                 </a>
                 <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-colors text-center cursor-pointer">
                   了解服務項目
                 </a>
                 
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

        <section id="services" className="py-20 bg-slate-50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">專業醫療服務項目</h2>
              <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section id="doctors" className="py-20 bg-white">
          <div className="container mx-auto px-4">
             <div className="text-center mb-16">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Medical Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">專業醫師團隊</h2>
              <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
              <p className="mt-4 text-slate-500 max-w-2xl mx-auto">由榮總、成大等醫學中心資歷的專科醫師親自看診</p>
            </div>
            <MedicalTeam />
          </div>
        </section>

        <section id="schedule" className="py-20 bg-slate-50/50">
           <div className="container mx-auto px-4">
             <div className="text-center mb-16">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Outpatient & Dialysis Hours</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">門診與透析時間</h2>
              <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            </div>
            <ScheduleTables />
           </div>
        </section>

        <section id="checkup" className="py-20 bg-gradient-to-b from-cyan-900 to-cyan-800 text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pattern-dots"></div>
           <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">腎臟健康自我檢測</h2>
                 <p className="text-cyan-100 max-w-2xl mx-auto text-lg">
                   腎臟病初期往往沒有明顯症狀，透過簡單的自我評估，提早發現潛在風險。
                 </p>
              </div>
              <KidneyCheck />
           </div>
        </section>

        <section id="knowledge" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Health Knowledge</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">衛教專欄</h2>
              <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            </div>
            <KnowledgeColumn />
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
             <div>
                <div className="flex items-center gap-2 mb-6">
                   <ClinicLogo className="w-10 h-10 brightness-0 invert opacity-80" />
                   <h3 className="text-xl font-bold text-white tracking-wide">{CLINIC_INFO.name}</h3>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {CLINIC_INFO.slogan}<br/>
                  致力於提供小港地區最優質的洗腎與內科醫療服務。
                </p>
             </div>
             
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">聯絡資訊</h4>
                <ul className="space-y-4 text-slate-400">
                   <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-lime-500 flex-shrink-0 mt-1" />
                      <span>{CLINIC_INFO.address}</span>
                   </li>
                   <li className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-lime-500 flex-shrink-0" />
                      <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white transition-colors">
                        {CLINIC_INFO.phone}
                      </a>
                   </li>
                   <li className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-lime-500 flex-shrink-0" />
                      <span>週一至週六 08:00 - 22:00</span>
                   </li>
                </ul>
             </div>
             
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">快速連結</h4>
                <ul className="space-y-2 text-slate-400">
                   <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-lime-400 transition-colors">服務項目</a></li>
                   <li><a href="#doctors" onClick={(e) => scrollToSection(e, 'doctors')} className="hover:text-lime-400 transition-colors">醫師團隊</a></li>
                   <li><a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="hover:text-lime-400 transition-colors">門診時間</a></li>
                   <li><a href="#checkup" onClick={(e) => scrollToSection(e, 'checkup')} className="hover:text-lime-400 transition-colors">腎臟檢測</a></li>
                </ul>
             </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
             <p>&copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 bg-white text-cyan-800 p-3 rounded-full shadow-lg border border-cyan-100 transition-all duration-300 hover:bg-cyan-50 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;
