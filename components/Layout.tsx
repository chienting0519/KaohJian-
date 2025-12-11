
import React, { useState, useEffect, Suspense, createContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ChevronUp, ClipboardCheck, Building2, ExternalLink } from 'lucide-react';
import { CLINIC_INFO, ALLIANCE_HOSPITALS } from '../constants';
import { AllianceHospital } from '../types';
import { DoctorIcon } from './DoctorIcon';

const AIChat = React.lazy(() => import('./AIChat'));

export const LayoutContext = createContext<{
  setIsChatOpen: (isOpen: boolean) => void;
}>({ setIsChatOpen: () => {} });

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [infoModal, setInfoModal] = useState<'checkup' | 'visit' | 'booking' | 'alliance' | null>(null);
  const [selectedAllianceHospital, setSelectedAllianceHospital] = useState<AllianceHospital | null>(null);
  const location = useLocation();

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

  const handleAllianceClick = (hospital: AllianceHospital) => {
    setSelectedAllianceHospital(hospital);
    setInfoModal('alliance');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Marquee items data
  const marqueeItems = [
    { label: '免費成人健檢', icon: <ClipboardCheck className="w-6 h-6 sm:w-8 sm:h-8" />, action: () => setInfoModal('checkup') },
    { label: '洗腎參觀', icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />, action: () => setInfoModal('visit') },
    { label: '門診掛號', icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8" />, action: () => setInfoModal('booking') },
  ];

  const navLinks = [
    { path: '/', label: '首頁' },
    { path: '/services', label: '服務項目' },
    { path: '/team', label: '醫療團隊' },
    { path: '/schedule', label: '門診時間' },
    { path: '/checkup', label: '腎臟檢測' },
    { path: '/knowledge', label: '健康新知' },
    { path: '/traffic', label: '交通指引' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-lime-200 selection:text-slate-900 flex flex-col">
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
        .active-nav {
            color: #0e7490;
            background-color: #ecfeff;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all duration-300 h-20">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group">
              {/* Logo removed as requested */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-cyan-900 tracking-tight group-hover:text-cyan-700 transition-colors">
                  {CLINIC_INFO.name}
                </h1>
                <p className="text-sm text-slate-500 font-bold tracking-wide">
                  高雄腎臟專科 • 洗腎中心
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
               {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => 
                      `px-4 py-2 font-bold rounded-full transition-all text-lg lg:text-xl ${
                        isActive 
                        ? 'text-cyan-700 bg-cyan-50 active-nav' 
                        : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
               ))}
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

        {/* Mobile Menu Dropdown (Optimized) */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[calc(100vh-80px)] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 space-y-4 h-[calc(100vh-80px)] overflow-y-auto pb-32">
             {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-6 py-4 font-bold rounded-2xl transition-all text-xl ${
                      isActive 
                      ? 'text-cyan-700 bg-cyan-50 shadow-sm' 
                      : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
             ))}
             <a 
               href={CLINIC_INFO.bookingLink}
               target="_blank"
               rel="noreferrer" 
               className="mt-4 bg-[#06c755] hover:bg-[#05b34c] text-white px-6 py-4 rounded-2xl font-bold text-center shadow-md text-xl active:scale-95 transition-transform"
             >
               立即預約掛號
             </a>
          </div>
        </div>
      </nav>

      {/* Fixed Marquee Banner */}
      <div className="fixed top-20 left-0 w-full z-30 bg-cyan-900 h-16 flex items-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap w-full">
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

      {/* Main Content Area */}
      <main className="pt-[144px] flex-grow">
          <LayoutContext.Provider value={{ setIsChatOpen }}>
            {children}
          </LayoutContext.Provider>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <h3 className="text-xl font-bold text-white tracking-wide">{CLINIC_INFO.name}</h3>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  高雄市民的健康就交給高健診所<br/>
                  提供小港地區最優質的洗腎與內科醫療服務。<br/>
                  <span className="text-lime-400 font-bold">小港、鳳山、林園、大寮、前鎮</span>溫馨接送
                </p>
             </div>
             
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">聯絡資訊</h4>
                <ul className="space-y-4 text-slate-400 mb-6">
                   <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-lime-500 flex-shrink-0 mt-1" />
                      <a 
                        href={CLINIC_INFO.mapLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-white transition-colors hover:underline"
                      >
                        {CLINIC_INFO.address}
                      </a>
                   </li>
                   <li className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-lime-500 flex-shrink-0" />
                      <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white transition-colors">
                        {CLINIC_INFO.phone}
                      </a>
                   </li>
                </ul>

                <div className="w-full h-48 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg relative">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="高健診所地圖"
                      marginHeight={0}
                      marginWidth={0}
                      scrolling="no"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(CLINIC_INFO.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                      className="absolute inset-0 filter opacity-90 hover:opacity-100 transition-opacity"
                    ></iframe>
                </div>
             </div>
             
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">快速連結</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-400">
                   <li><Link to="/services" className="hover:text-lime-400 transition-colors block">服務項目</Link></li>
                   <li><Link to="/team" className="hover:text-lime-400 transition-colors block">醫師團隊</Link></li>
                   <li><Link to="/schedule" className="hover:text-lime-400 transition-colors block">門診時間</Link></li>
                   <li><Link to="/checkup" className="hover:text-lime-400 transition-colors block">腎臟檢測</Link></li>
                   <li>
                     <Link 
                       to="/clinics"
                       className="hover:text-lime-400 transition-colors block text-left"
                     >
                       高雄市洗腎診所
                     </Link>
                   </li>
                   <li>
                     <a 
                       href="https://www.tckdf.org.tw/Main/Index"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="hover:text-lime-400 transition-colors block text-left"
                     >
                       腎臟病防治基金會
                     </a>
                   </li>
                   <li>
                     <a 
                       href="https://health.businessweekly.com.tw/JHospital.aspx?id=HOSP000002974"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="hover:text-lime-400 transition-colors block text-left"
                     >
                       良醫健康網
                     </a>
                   </li>
                   <li>
                     <a 
                       href="https://www.clinics.com.tw/hospital/3502112113"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="hover:text-lime-400 transition-colors block text-left"
                     >
                       台灣診所網
                     </a>
                   </li>
                   <li>
                     <a 
                       href="https://kb.commonhealth.com.tw/hospitals/8966.html"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="hover:text-lime-400 transition-colors block text-left"
                     >
                       康健知識庫
                     </a>
                   </li>
                   <li>
                     <a 
                       href="https://udnhealth-hd.com/HD/clinic/374"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="hover:text-lime-400 transition-colors block text-left"
                     >
                       元氣網透析專區
                     </a>
                   </li>
                </ul>
             </div>

             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">高雄醫療照護聯盟</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-400 text-sm">
                   {ALLIANCE_HOSPITALS.map((hospital, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => handleAllianceClick(hospital)}
                          className="hover:text-lime-400 block text-left w-full transition-colors"
                        >
                          {hospital.name}
                        </button>
                      </li>
                   ))}
                </ul>
             </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
             <p>&copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AIChat */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {isChatOpen === false && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="group bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-3 pr-6 hover:-translate-y-1"
          >
            <div className="relative">
               <DoctorIcon className="w-11 h-11 border-2 border-white rounded-full shadow-md bg-white" />
               <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-cyan-600 animate-pulse"></span>
            </div>
            <div className="text-left">
              <div className="text-xs text-cyan-200 font-medium mb-0.5">有問題嗎？</div>
              <div className="text-base font-bold tracking-wide">詢問 AI 助理</div>
            </div>
          </button>
        )}
        
        {isChatOpen === true && (
           <Suspense fallback={
             <div className="bg-white rounded-2xl shadow-2xl mb-4 w-[90vw] sm:w-[380px] h-[550px] flex items-center justify-center border border-cyan-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
             </div>
           }>
               <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
           </Suspense>
        )}
      </div>

      {/* Modals */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setInfoModal(null)}
          ></div>
          <div className={`bg-white rounded-2xl w-full ${infoModal === 'alliance' ? 'max-w-4xl max-h-[85vh]' : 'max-w-md'} p-6 sm:p-8 relative z-10 animate-in zoom-in-95 shadow-2xl flex flex-col`}>
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
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-cyan-900 text-lg mb-1 flex items-center gap-2">1. 免費成人健檢</h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-0.5">
                          <li><strong>資格：</strong>30-64歲每3年一次，65歲以上每年一次。</li>
                          <li><strong>內容：</strong>身體檢查、血糖、血脂、肝腎功能、尿液檢查。</li>
                      </ul>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-cyan-900 text-lg mb-1 flex items-center gap-2">2. 大腸癌篩檢 (糞便潛血)</h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-0.5">
                          <li><strong>資格：</strong>50-74歲民眾，每2年補助一次。</li>
                          <li><strong>方式：</strong>定量免疫法糞便潛血檢查。</li>
                      </ul>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-cyan-900 text-lg mb-1 flex items-center gap-2">3. 肝炎篩檢 (B、C型)</h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-0.5">
                          <li><strong>資格：</strong>45-79歲民眾 (原住民40-79歲)，終身補助一次。</li>
                      </ul>
                  </div>
                  <div className="flex items-start gap-2 text-orange-600 font-bold text-sm bg-orange-50 p-2.5 rounded-lg border border-orange-100 mt-1">
                    <span className="mt-0.5 flex-shrink-0">⚠️</span>
                    <p>注意事項：成人健檢需空腹 8 小時，請務必攜帶健保卡。</p>
                  </div>
                  <div className="pt-2 space-y-2">
                    <a href={CLINIC_INFO.bookingLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-base py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
                      Line 預約健檢
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
                  <a href={CLINIC_INFO.bookingLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-6 h-6" />
                    Line 預約參觀
                  </a>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center justify-center gap-3 w-full bg-white border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-700 text-slate-600 font-bold text-lg py-4 rounded-xl transition-all">
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
                    <a href={CLINIC_INFO.bookingLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-6 h-6" />
                      立即 Line 掛號
                    </a>
                  </div>
                </div>
              </div>
            )}

            {infoModal === 'alliance' && selectedAllianceHospital && (
              <div className="text-slate-800 flex flex-col h-full overflow-hidden">
                <div className="mb-4 border-b border-slate-100 pb-3 flex-shrink-0">
                    <span className="text-cyan-600 font-bold text-xs tracking-wider mb-1 block">高雄醫療照護聯盟</span>
                    <h3 className="text-2xl font-bold text-slate-800 leading-tight">{selectedAllianceHospital.name}</h3>
                </div>
                <div className="flex-1 overflow-y-auto pr-1">
                    <div className="grid md:grid-cols-2 gap-6 h-full">
                        <div className="space-y-6">
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 text-cyan-700 shadow-sm">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wide mb-1">醫院地址</h4>
                                        <p className="text-slate-900 text-lg font-bold leading-snug">{selectedAllianceHospital.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0 text-lime-700 shadow-sm">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wide mb-1">聯絡電話</h4>
                                        <p className="text-slate-900 text-xl font-bold tracking-wide font-mono">{selectedAllianceHospital.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                 <a href={`tel:${selectedAllianceHospital.phone.split('#')[0]}`} className="flex items-center justify-center gap-3 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                    <Phone className="w-5 h-5" />
                                    立即撥打電話
                                  </a>
                                  <a href={selectedAllianceHospital.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-white border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 text-slate-600 hover:text-cyan-800 font-bold text-base py-3 rounded-xl transition-all">
                                     <ExternalLink className="w-4 h-4" />
                                     前往官方網站
                                  </a>
                            </div>
                        </div>
                        <div className="h-64 md:h-auto min-h-[300px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
                             <iframe width="100%" height="100%" frameBorder="0" title={`${selectedAllianceHospital.name} 地圖`} marginHeight={0} marginWidth={0} scrolling="no" src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedAllianceHospital.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`} className="absolute inset-0"></iframe>
                        </div>
                    </div>
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

export default Layout;
