import React, { useState } from 'react';
import { CLINIC_INFO, SERVICES } from './constants';
import { MapPin, Phone, Menu, X, ArrowRight, Facebook, Car, ParkingSquare, Train, Building, Accessibility, Sun, BookOpen, MessageCircle, Bot, Sparkles, UserPlus } from 'lucide-react';
import ServiceCard from './components/ServiceCard';
import KidneyCheck from './components/KidneyCheck';
import AIChat from './components/AIChat';
import ScheduleTables from './components/ScheduleTables';
import { ClinicLogo } from './components/ClinicLogo';
import KnowledgeColumn from './components/KnowledgeColumn';
import MedicalTeam from './components/MedicalTeam';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle smooth scroll programmatically to avoid URL hash conflicts (Connection Refused errors)
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  const FEATURES = [
    {
      icon: <Car className="w-8 h-8 text-white" />,
      title: "愛心接送服務",
      desc: "體恤長者與行動不便腎友，提供接送協助。",
      color: "bg-rose-500" // Warm color for 'Love'
    },
    {
      icon: <ParkingSquare className="w-8 h-8 text-white" />,
      title: "附設專屬停車場",
      desc: "停車方便，家屬接送無負擔。",
      color: "bg-cyan-600"
    },
    {
      icon: <Train className="w-8 h-8 text-white" />,
      title: "捷運步行 8 分鐘",
      desc: "近高雄國際機場站(高雄公園)，交通便利。",
      color: "bg-lime-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
      
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cyan-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
             {/* Logo Component */}
             <div className="flex items-center justify-center">
               <ClinicLogo className="h-12 w-12 sm:h-14 sm:w-14" />
             </div>
             <div>
               <h1 className="text-2xl font-bold text-cyan-900 leading-none tracking-tight">{CLINIC_INFO.name}</h1>
               <p className="text-xs text-cyan-600 tracking-wide font-medium">高雄腎臟專科 • 洗腎中心</p>
             </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 xl:gap-6">
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-slate-600 hover:text-cyan-700 font-medium transition-colors hover:underline decoration-lime-500 decoration-2 underline-offset-4 text-sm xl:text-base cursor-pointer">首頁</a>
            <a href="#checkup" onClick={(e) => scrollToSection(e, 'checkup')} className="text-slate-600 hover:text-cyan-700 font-medium transition-colors hover:underline decoration-lime-500 decoration-2 underline-offset-4 text-sm xl:text-base cursor-pointer">腎臟檢測</a>
            <a href="#environment" onClick={(e) => scrollToSection(e, 'environment')} className="text-slate-600 hover:text-cyan-700 font-medium transition-colors hover:underline decoration-lime-500 decoration-2 underline-offset-4 text-sm xl:text-base cursor-pointer">環境介紹</a>
            <a href="#team" onClick={(e) => scrollToSection(e, 'team')} className="text-slate-600 hover:text-cyan-700 font-medium transition-colors hover:underline decoration-lime-500 decoration-2 underline-offset-4 text-sm xl:text-base cursor-pointer">醫療團隊</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-slate-600 hover:text-cyan-700 font-medium transition-colors hover:underline decoration-lime-500 decoration-2 underline-offset-4 text-sm xl:text-base cursor-pointer">服務項目</a>
            <a href="#info" onClick={(e) => scrollToSection(e, 'info')} className="text-slate-600 hover:text-cyan-700 font-medium transition-colors hover:underline decoration-lime-500 decoration-2 underline-offset-4 text-sm xl:text-base cursor-pointer">診所資訊</a>
            
            <div className="flex items-center gap-3 ml-2">
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 px-4 py-2 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 transform hover:-translate-y-0.5 text-sm"
              >
                <Bot className="w-4 h-4" />
                詢問 AI 助理
              </button>
              <a 
                href={CLINIC_INFO.bookingLink} 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#06c755] hover:bg-[#05b34c] text-white px-5 py-2 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5 text-sm"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-4 h-4" />
                預約掛號
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-cyan-800" onClick={toggleMenu} aria-label="Toggle navigation menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
           <div className="md:hidden bg-white border-t border-cyan-100 animate-fade-in">
             <div className="flex flex-col p-4 space-y-4">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-cyan-900 font-medium p-2 hover:bg-cyan-50 rounded cursor-pointer">首頁</a>
              <a href="#checkup" onClick={(e) => scrollToSection(e, 'checkup')} className="text-cyan-900 font-medium p-2 hover:bg-cyan-50 rounded cursor-pointer">腎臟檢測</a>
              <a href="#environment" onClick={(e) => scrollToSection(e, 'environment')} className="text-cyan-900 font-medium p-2 hover:bg-cyan-50 rounded cursor-pointer">環境介紹</a>
              <a href="#team" onClick={(e) => scrollToSection(e, 'team')} className="text-cyan-900 font-medium p-2 hover:bg-cyan-50 rounded cursor-pointer">醫療團隊</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-cyan-900 font-medium p-2 hover:bg-cyan-50 rounded cursor-pointer">服務項目</a>
              <a href="#info" onClick={(e) => scrollToSection(e, 'info')} className="text-cyan-900 font-medium p-2 hover:bg-cyan-50 rounded cursor-pointer">診所資訊</a>
              
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsChatOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-cyan-50 text-cyan-700 border border-cyan-200 px-4 py-3 rounded-lg font-bold text-center shadow-sm flex items-center justify-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  詢問 AI 助理
                </button>
                <a 
                  href={CLINIC_INFO.bookingLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#06c755] text-white px-4 py-3 rounded-lg font-bold text-center shadow-sm flex items-center justify-center gap-2"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
                  Line 預約掛號
                </a>
              </div>
             </div>
           </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900 text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
          {/* Decorative circles reflecting the logo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block px-4 py-1 rounded-full bg-cyan-800/50 border border-cyan-400/30 text-cyan-200 mb-6 text-sm font-semibold tracking-wider">
                小港在地的專業依靠，守護腎臟健康
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {CLINIC_INFO.slogan}
              </h2>
              <p className="text-xl lg:text-2xl text-cyan-50 mb-10 leading-relaxed font-light">
                結合醫學中心等級的透析技術與社區診所的溫馨照護。<br className="hidden sm:block" />
                我們提供全方位的腎臟專科診療，讓您在舒適環境中重拾健康活力。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <a href="#checkup" onClick={(e) => scrollToSection(e, 'checkup')} className="bg-lime-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-600 transition-all shadow-lg hover:shadow-lime-500/30 text-center transform hover:-translate-y-1 cursor-pointer">
                   立即檢測腎臟健康
                 </a>
                 <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors text-center cursor-pointer">
                   了解服務項目
                 </a>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights / Features Strip */}
        <section className="relative z-20 -mt-8 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className={`${feature.color} p-3 rounded-lg shadow-sm flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{feature.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Prominent AI Assistant Section */}
        <section className="py-12 mt-8 md:mt-12 bg-white scroll-mt-24" id="ai-assistant">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-cyan-200 shadow-md relative overflow-hidden group">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-cyan-300/20 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-lime-200/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

              <div className="relative z-10 flex-1 text-center md:text-left">
                 <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-cyan-200 shadow-sm mb-4 animate-bounce-slow">
                    <Bot className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-bold text-cyan-800">24小時線上服務</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold text-cyan-900 mb-3">有任何健康疑問？想預約掛號？</h2>
                 <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                   高健 AI 助理能即時回答您的問題，協助您<strong className="text-cyan-700">查詢門診時間</strong>、<strong className="text-cyan-700">了解洗腎資訊</strong>或<strong className="text-cyan-700">完成線上掛號</strong>，無需等待，隨問隨答。
                 </p>
              </div>
              
              <div className="relative z-10 flex-shrink-0">
                <button 
                   onClick={() => setIsChatOpen(true)}
                   className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-3 animate-pulse-slow ring-4 ring-cyan-100"
                >
                   <MessageCircle className="w-6 h-6" />
                   立即諮詢 AI 助理
                   <Sparkles className="w-4 h-4 text-lime-300" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Kidney Check Section (Moved Up, changed to bg-slate-50) */}
        <section id="checkup" className="py-20 bg-slate-50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-lime-600 font-bold tracking-wider uppercase text-sm">Self Assessment</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-cyan-900 mt-2">您的腎臟健康嗎？</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                慢性腎臟病初期通常沒有明顯症狀。透過簡單的自我評估，了解是否需要進一步檢查。
              </p>
            </div>
            <KidneyCheck />
          </div>
        </section>

        {/* Environment Section (Moved Down, changed to bg-white) */}
        <section id="environment" className="py-20 bg-white relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm">Clinic Environment</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-cyan-900 mt-2 mb-6">舒適寬敞的獨棟醫療大樓</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                高健診所為您打造五星級的就醫環境。我們擁有獨棟透析大樓，提供寬敞明亮的治療空間，
                結合現代化的醫療設備與人性化的空間設計，讓每位病患都能在放鬆、安心的氛圍中接受專業照護。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group">
                 <div className="bg-cyan-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-100 transition-colors">
                    <Building className="w-10 h-10 text-cyan-600" />
                 </div>
                 <h4 className="font-bold text-cyan-900 text-xl mb-3">獨棟透析大樓</h4>
                 <p className="text-slate-600 leading-relaxed">專屬醫療空間規劃，環境單純安全，有效落實感控分流，給您最安心的治療場域。</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group">
                 <div className="bg-lime-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-lime-100 transition-colors">
                    <Accessibility className="w-10 h-10 text-lime-600" />
                 </div>
                 <h4 className="font-bold text-cyan-900 text-xl mb-3">無障礙友善設施</h4>
                 <p className="text-slate-600 leading-relaxed">全棟設有醫療專用電梯與平緩的無障礙坡道，體貼行動不便的長者與輪椅使用者。</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group">
                 <div className="bg-orange-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-100 transition-colors">
                    <Sun className="w-10 h-10 text-orange-500" />
                 </div>
                 <h4 className="font-bold text-cyan-900 text-xl mb-3">明亮舒適候診區</h4>
                 <p className="text-slate-600 leading-relaxed">大面採光設計，寬敞不壓迫，搭配溫馨的色調，讓等待過程也能保持心情愉悅。</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Medical Team Section */}
        <section id="team" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-20">
          <div className="container mx-auto px-4">
             <div className="text-center mb-16">
               <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2">
                 <UserPlus className="w-4 h-4" /> Professional Team
               </span>
               <h2 className="text-3xl lg:text-4xl font-bold text-cyan-900 mt-2">專業醫療團隊</h2>
               <p className="text-slate-600 mt-4 text-lg">提供最專業、親切的醫療服務</p>
               <div className="w-24 h-1 bg-lime-500 mx-auto mt-6 rounded-full"></div>
             </div>
             
             <MedicalTeam />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm">Medical Services</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-cyan-900 mt-2">專業醫療服務項目</h2>
              <div className="w-24 h-1 bg-lime-500 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Knowledge Column Section */}
        <section id="knowledge" className="py-20 bg-slate-50 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-100 via-lime-200 to-cyan-100"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
               <div>
                  <span className="text-lime-600 font-bold tracking-wider uppercase text-sm flex items-center gap-2">
                     <BookOpen className="w-4 h-4" /> Health Knowledge
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-cyan-900 mt-2">高健知識專欄</h2>
                  <p className="text-slate-600 mt-2">專業醫師為您解惑，掌握正確的腎臟保健知識。</p>
               </div>
               <a href="#" className="hidden md:flex text-cyan-600 font-bold items-center gap-2 hover:translate-x-1 transition-transform">
                  查看所有文章 <ArrowRight className="w-5 h-5" />
               </a>
            </div>
            
            <KnowledgeColumn />
            
            <div className="mt-8 text-center md:hidden">
               <a href="#" className="text-cyan-600 font-bold inline-flex items-center gap-2">
                  查看所有文章 <ArrowRight className="w-5 h-5" />
               </a>
            </div>
          </div>
        </section>

        {/* Info & Location Section */}
        <section id="info" className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-cyan-900 mb-8 flex items-center gap-3 justify-center md:justify-start">
              <span className="w-2 h-8 bg-lime-500 rounded-full"></span>
              門診資訊
            </h2>

            {/* Schedule Tables - Full Width on Mobile, Side-by-Side on Desktop */}
            <div className="mb-12">
              <ScheduleTables />
            </div>

            {/* Contact Info & Map - Side-by-Side on Desktop */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
               {/* Contact Info */}
               <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cyan-100 hover:border-cyan-200 transition-colors shadow-sm h-full flex flex-col justify-center">
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="bg-cyan-50 p-4 rounded-xl text-cyan-600 shadow-sm border border-cyan-100 flex-shrink-0 mt-1">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-cyan-900 text-xl sm:text-2xl mb-2">診所地址</h4>
                        <address className="text-slate-700 text-xl sm:text-2xl leading-relaxed font-medium not-italic">{CLINIC_INFO.address}</address>
                        <a href={CLINIC_INFO.mapLink} target="_blank" rel="noreferrer" className="text-cyan-600 text-lg font-bold hover:text-cyan-700 mt-3 inline-flex items-center group">
                          Google Maps 導航 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 border-t border-slate-50 pt-8">
                      <div className="bg-cyan-50 p-4 rounded-xl text-cyan-600 shadow-sm border border-cyan-100 flex-shrink-0 mt-1">
                        <Phone className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-cyan-900 text-xl sm:text-2xl mb-2">聯絡電話</h4>
                        <p className="text-slate-700 text-3xl sm:text-4xl font-mono font-bold tracking-tight text-cyan-800">{CLINIC_INFO.phone}</p>
                        <p className="text-slate-500 mt-2">歡迎來電預約或諮詢</p>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Map */}
               <div className="h-[300px] sm:h-[400px] bg-slate-200 rounded-2xl overflow-hidden relative shadow-inner border border-slate-200">
                  <iframe 
                    title="Google Map Location of KaohJian Clinic"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.045622154483!2d120.3541459!3d22.5649129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e033355555555%3A0x1234567890abcdef!2zODEx高雄市小港區沿海一路88號!5e0!3m2!1szh-TW!2stw!4v1700000000000!5m2!1szh-TW!2stw"
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-cyan-950 text-slate-300 py-12 border-t-4 border-lime-500">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8 border-b border-cyan-800 pb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <ClinicLogo className="w-8 h-8" />
                  {CLINIC_INFO.name}
              </h3>
              <p className="mb-4 text-cyan-100/80 leading-relaxed">
                專精腎臟科、洗腎預防、三高慢性病調理。<br/>
                高雄市民的健康守護者。
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61559290111933" target="_blank" rel="noreferrer" aria-label="Visit our Facebook page" className="bg-cyan-900 p-2 rounded-full hover:bg-lime-600 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">快速連結</h4>
              <ul className="space-y-2">
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-lime-400 transition-colors flex items-center gap-2 cursor-pointer"><ArrowRight className="w-3 h-3" /> 首頁</a></li>
                <li><a href="#checkup" onClick={(e) => scrollToSection(e, 'checkup')} className="hover:text-lime-400 transition-colors flex items-center gap-2 cursor-pointer"><ArrowRight className="w-3 h-3" /> 腎臟檢測</a></li>
                <li><a href="#environment" onClick={(e) => scrollToSection(e, 'environment')} className="hover:text-lime-400 transition-colors flex items-center gap-2 cursor-pointer"><ArrowRight className="w-3 h-3" /> 環境介紹</a></li>
                <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-lime-400 transition-colors flex items-center gap-2 cursor-pointer"><ArrowRight className="w-3 h-3" /> 服務項目</a></li>
                <li><a href="#knowledge" onClick={(e) => scrollToSection(e, 'knowledge')} className="hover:text-lime-400 transition-colors flex items-center gap-2 cursor-pointer"><ArrowRight className="w-3 h-3" /> 知識專欄</a></li>
                <li><a href={CLINIC_INFO.bookingLink} className="hover:text-lime-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> 預約掛號</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">聯絡我們</h4>
              <address className="space-y-3 not-italic">
                  <p className="flex items-start gap-2"><Phone className="w-5 h-5 text-lime-500 mt-0.5" /> {CLINIC_INFO.phone}</p>
                  <p className="flex items-start gap-2"><MapPin className="w-5 h-5 text-lime-500 mt-0.5" /> {CLINIC_INFO.address}</p>
              </address>
            </div>
          </div>
          <div className="text-center text-sm text-cyan-400/60 flex flex-col md:flex-row justify-center items-center gap-4">
            <span>&copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* AI Chat Assistant - Controlled via Props */}
      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;