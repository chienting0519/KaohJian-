

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, MessageCircle, ChevronUp, ClipboardCheck, Stethoscope, Building2, ExternalLink } from 'lucide-react';
import { CLINIC_INFO, SERVICES, KAOHSIUNG_CLINICS_LIST } from './constants';
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
  const [infoModal, setInfoModal] = useState<'checkup' | 'visit' | 'booking' | 'kaohsiung_clinics' | null>(null);

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
      // Offset calculation: Navbar (80px) + Marquee (64px) + Buffer = ~150px
      const offset = 150;
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

  // Marquee items data
  const marqueeItems = [
    { label: '免費成人健檢', icon: <ClipboardCheck className="w-6 h-6 sm:w-8 sm:h-8" />, action: () => setInfoModal('checkup') },
    { label: '洗腎參觀', icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />, action: () => setInfoModal('visit') },
    { label: '門診掛號', icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8" />, action: () => setInfoModal('booking') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-lime-200 selection:text-slate-900">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Navigation - Fixed at top (h-20 = 80px) */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all duration-300 h-20">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
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
                      className="px-4 py-2 text-slate-600 font-bold hover:text-cyan-700 hover:bg-cyan-50 rounded-full transition-all text-lg lg:text-xl"
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
                      className="px-4 py-3 text-slate-600 font-bold hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-all text-xl"
                    >
                      {labels[item]}
                    </a>
                  );
               })}
               <a 
                 href={CLINIC_INFO.bookingLink}
                 target="_blank"
                 rel="noreferrer" 
                 className="mt-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-4 py-3 rounded-xl font-bold text-center shadow-sm text-xl"
               >
                 立即預約掛號
               </a>
            </div>
          </div>
        )}
      </nav>

      {/* Fixed Marquee Banner - h-16 (64px) | No borders | No shadows | Bigger Text */}
      <div className="fixed top-20 left-0 w-full z-30 bg-cyan-900 h-16 flex items-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap w-full">
          {/* Repeat list multiple times for seamless loop */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-24 px-6 flex-shrink-0">
              {marqueeItems.map((item, idx) => (
                <button 
                  key={`${i}-${idx}`} 
                  onClick={item.action} 
                  className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-cyan-50 hover:text-lime-300 transition-colors group"
                >
                  <span className="p-1.5 bg-white/10 rounded-full group-hover:bg-lime-400 group-hover:text-cyan-900 transition-colors">
                      {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Added padding top: Fixed Nav (80px) + Fixed Marquee (64px) = 144px */}
      <main className="pt-[144px]">
        <section id="home" className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900 text-white pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-200 mb-8 tracking-wider">
                小港在地的專業依靠，守護腎臟健康
              </h3>
              
              <div className="mb-10">
                  <h2 className="text-4xl sm:text-7xl lg:text-8xl font-bold leading-tight">
                    高雄市民的健康<br />
                    交給高健診所
                  </h2>
              </div>
              
              {/* Desktop Location Display */}
              <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 text-4xl font-bold text-lime-300 mb-10 tracking-wide">
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
              <div className="flex sm:hidden flex-col items-center justify-center gap-2 text-3xl font-bold text-lime-300 mb-10 tracking-wide">
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

              <div className="flex justify-center mb-12">
                <p className="text-2xl lg:text-3xl text-cyan-50 leading-relaxed font-light text-left inline-block">
                  結合醫學中心等級的透析技術與社區診所的溫馨照護。<br className="hidden sm:block" />
                  我們提供全方位的腎臟專科診療，讓您在舒適環境中重拾健康活力。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mb-8 items-center justify-center">
                 <a 
                   href="#checkup" 
                   onClick={(e) => scrollToSection(e, 'checkup')} 
                   className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-lime-500/30 text-center transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-4 ring-2 ring-white/20"
                 >
                   <ClipboardCheck className="w-9 h-9 flex-shrink-0" />
                   <div className="flex flex-col items-start text-left">
                     <span className="leading-none mb-1.5">立即檢測腎臟健康</span>
                     <span className="text-base text-white/90 font-bold">一分鐘自我檢測</span>
                   </div>
                 </a>
                 
                 <a 
                   href="#services" 
                   onClick={(e) => scrollToSection(e, 'services')} 
                   className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-4"
                 >
                   <Stethoscope className="w-9 h-9 flex-shrink-0" />
                   <div className="flex flex-col items-start text-left">
                     <span className="leading-none mb-1.5">了解服務項目</span>
                     <span className="text-base text-cyan-100 font-bold">專業醫療照護</span>
                   </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <h3 className="text-xl font-bold text-white tracking-wide">{CLINIC_INFO.name}</h3>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  高雄市民的健康就交給高健診所<br/>
                  於提供小港地區最優質的洗腎與內科醫療服務。<br/>
                  提供小港、鳳山、林園、大寮、前鎮溫馨接送。
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
                </ul>
             </div>
             
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">快速連結</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-400">
                   <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-lime-400 transition-colors block">服務項目</a></li>
                   <li><a href="#doctors" onClick={(e) => scrollToSection(e, 'doctors')} className="hover:text-lime-400 transition-colors block">醫師團隊</a></li>
                   <li><a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="hover:text-lime-400 transition-colors block">門診時間</a></li>
                   <li><a href="#checkup" onClick={(e) => scrollToSection(e, 'checkup')} className="hover:text-lime-400 transition-colors block">腎臟檢測</a></li>
                   {/* 新增連結: 高雄市洗腎診所 */}
                   <li>
                     <button 
                       onClick={() => setInfoModal('kaohsiung_clinics')}
                       className="hover:text-lime-400 transition-colors block text-left"
                     >
                       高雄市洗腎診所
                     </button>
                   </li>
                </ul>
             </div>

             {/* SEO Links Section */}
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">高雄醫療照護聯盟</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-400 text-sm">
                   <li><a href="https://www.kmhk.org.tw/" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">高雄市立小港醫院</a></li>
                   <li><a href="https://www.vghks.gov.tw/" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">高雄榮民總醫院</a></li>
                   <li><a href="https://www.kmuh.org.tw/" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">高雄醫學大學附設醫院</a></li>
                   <li><a href="https://www.cgmh.org.tw/tw/Systems/AreaInfo/10" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">高雄長庚紀念醫院</a></li>
                   <li><a href="https://www.edah.org.tw/" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">義大醫療財團法人</a></li>
                   <li><a href="http://www.yuanhosp.com.tw/" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">阮綜合醫院</a></li>
                   <li><a href="https://www.jiannren.org.tw/" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">健仁醫院</a></li>
                   <li><a href="https://802.mnd.gov.tw/" target="_blank" rel="noreferrer" className="hover:text-lime-400 block">國軍高雄總醫院</a></li>
                </ul>
             </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
             <p>&copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      
      {/* Information Modal */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setInfoModal(null)}
          ></div>
          <div className={`bg-white rounded-2xl w-full ${infoModal === 'kaohsiung_clinics' ? 'max-w-4xl max-h-[85vh]' : 'max-w-md'} p-6 sm:p-8 relative z-10 animate-in zoom-in-95 shadow-2xl flex flex-col`}>
            <button 
              onClick={() => setInfoModal(null)} 
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {infoModal === 'checkup' && (
              <div className="text-slate-800">
                <h3 className="text-xl font-bold text-cyan-800 mb-4 border-b border-slate-100 pb-3">免費健康檢查項目</h3>
                <div className="space-y-3 text-base leading-relaxed">
                  
                  {/* 1. 成人健檢 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-cyan-900 text-lg mb-1 flex items-center gap-2">
                          1. 免費成人健檢
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-0.5">
                          <li><strong>資格：</strong>40-64歲每3年一次，65歲以上每年一次。</li>
                          <li><strong>內容：</strong>身體檢查、血糖、血脂、肝腎功能、尿液檢查。</li>
                      </ul>
                  </div>

                  {/* 2. 大腸癌篩檢 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-cyan-900 text-lg mb-1 flex items-center gap-2">
                          2. 大腸癌篩檢 (糞便潛血)
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-0.5">
                          <li><strong>資格：</strong>50-74歲民眾，每2年補助一次。</li>
                          <li><strong>方式：</strong>定量免疫法糞便潛血檢查。</li>
                      </ul>
                  </div>

                  {/* 3. 肝炎篩檢 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-cyan-900 text-lg mb-1 flex items-center gap-2">
                          3. 肝炎篩檢 (B、C型)
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-0.5">
                          <li><strong>資格：</strong>45-79歲民眾 (原住民40-79歲)，終身補助一次。</li>
                      </ul>
                  </div>

                  <div className="flex items-start gap-2 text-orange-600 font-bold text-sm bg-orange-50 p-2.5 rounded-lg border border-orange-100 mt-1">
                    <span className="mt-0.5 flex-shrink-0">⚠️</span>
                    <p>注意事項：成人健檢需空腹 8 小時，請務必攜帶健保卡。</p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <a 
                      href={CLINIC_INFO.bookingLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-base py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
                      Line 預約健檢
                    </a>
                    <a 
                      href={`tel:${CLINIC_INFO.phone}`}
                      className="flex items-center justify-center gap-2 w-full bg-white border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-700 text-slate-600 font-bold text-base py-3 rounded-xl transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      致電預約健檢
                    </a>
                  </div>
                </div>
              </div>
            )}

            {infoModal === 'visit' && (
              <div className="text-slate-800">
                <h3 className="text-2xl font-bold text-cyan-800 mb-6 border-b border-slate-100 pb-4">預約參觀洗腎中心</h3>
                <p className="text-lg leading-relaxed text-slate-600 mb-8">
                  高健診所具備醫學中心等級的透析設備，環境寬敞明亮、溫馨舒適。<br/><br/>
                  歡迎家屬與腎友親臨參觀，將由專業護理長親自為您解說環境與設備，讓您安心選擇。
                </p>
                <div className="space-y-3">
                  <a 
                    href={CLINIC_INFO.bookingLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-6 h-6" />
                    Line 預約參觀
                  </a>
                  <a 
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="flex items-center justify-center gap-3 w-full bg-white border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-700 text-slate-600 font-bold text-lg py-4 rounded-xl transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    致電預約參觀
                  </a>
                </div>
              </div>
            )}

            {infoModal === 'booking' && (
              <div className="text-slate-800">
                <h3 className="text-2xl font-bold text-cyan-800 mb-6 border-b border-slate-100 pb-4">門診掛號須知</h3>
                <div className="space-y-6 text-lg">
                  <div className="space-y-4">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">1</div>
                        <div>
                           <h4 className="font-bold text-slate-900">掛號方式</h4>
                           <p className="text-slate-600 text-base">提供「現場掛號」與「LINE 線上預約」。建議多利用線上預約，減少現場等候時間。</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">2</div>
                        <div>
                           <h4 className="font-bold text-slate-900">攜帶證件</h4>
                           <p className="text-slate-600 text-base">請務必攜帶<span className="font-bold text-cyan-700">健保卡</span>。初診患者請加帶身分證辦理資料建檔。</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">3</div>
                        <div>
                           <h4 className="font-bold text-slate-900">掛號費用</h4>
                           <p className="text-slate-600 text-base">健保部分給付掛號費 <span className="font-bold text-red-500">150 元</span>。</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <a 
                      href={CLINIC_INFO.bookingLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-6 h-6" />
                      立即 Line 掛號
                    </a>
                    <a 
                      href={`tel:${CLINIC_INFO.phone}`}
                      className="flex items-center justify-center gap-3 w-full bg-white border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-700 text-slate-600 font-bold text-lg py-4 rounded-xl transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      致電掛號
                    </a>
                  </div>
                </div>
              </div>
            )}

            {infoModal === 'kaohsiung_clinics' && (
              <div className="text-slate-800 flex flex-col h-full overflow-hidden">
                <h3 className="text-2xl font-bold text-cyan-800 mb-4 border-b border-slate-100 pb-3 flex-shrink-0">高雄市洗腎醫療院所名冊</h3>
                <div className="overflow-y-auto flex-1 pr-2">
                  <table className="w-full text-left text-sm sm:text-base border-collapse">
                    <thead className="bg-cyan-50 sticky top-0 z-10">
                      <tr>
                        <th className="p-3 sm:p-4 font-bold text-cyan-900 border-b border-cyan-100">醫院名稱</th>
                        <th className="p-3 sm:p-4 font-bold text-cyan-900 border-b border-cyan-100">地址</th>
                        <th className="p-3 sm:p-4 font-bold text-cyan-900 border-b border-cyan-100 text-right sm:text-left">電話</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KAOHSIUNG_CLINICS_LIST.map((clinic, index) => {
                        const isTarget = clinic.name === '高健診所';
                        return (
                          <tr key={index} className={`border-b border-slate-50 transition-colors ${isTarget ? 'bg-cyan-50/50 hover:bg-cyan-50' : 'hover:bg-slate-50'}`}>
                            <td className={`p-3 sm:p-4 ${isTarget ? 'font-bold text-cyan-800 text-lg' : 'text-slate-100 font-normal blur-[1px]'}`}>
                              {clinic.name}
                            </td>
                            <td className={`p-3 sm:p-4 ${isTarget ? 'text-slate-700 font-medium' : 'text-slate-100 blur-[1px]'}`}>{clinic.address}</td>
                            <td className={`p-3 sm:p-4 whitespace-nowrap text-right sm:text-left ${isTarget ? 'text-slate-700 font-bold' : 'text-slate-100 blur-[1px]'}`}>{clinic.phone}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
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