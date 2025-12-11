
import React from 'react';
import SEO from '../components/SEO';
import { CLINIC_INFO } from '../constants';
import { MapPin, Bus, Train, Car, Phone } from 'lucide-react';

const TrafficGuide: React.FC = () => {
  return (
    <>
      <SEO 
        title="交通指引" 
        description="高健診所位於小港區交通樞紐，提供鳳山、林園、大寮與前鎮地區腎友溫馨接送服務。鄰近高雄捷運小港機場站(R4)。" 
      />
      <section className="py-12 bg-slate-50 min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Traffic Guide</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">交通指引與接送</h2>
            <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
             {/* Left Column: Text Info */}
             <div className="md:col-span-5 space-y-8 animate-in slide-in-from-left duration-700">
                
                {/* Highlight Box */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-lime-500">
                   <h3 className="text-2xl font-bold text-cyan-900 mb-4 flex items-center gap-2">
                     <Car className="w-8 h-8 text-lime-500" />
                     專屬接送服務
                   </h3>
                   <p className="text-slate-700 text-lg leading-relaxed font-bold">
                     高健診所位於小港區交通樞紐，提供<span className="text-lime-600 font-extrabold mx-1">鳳山、林園、大寮與前鎮</span>地區腎友<span className="text-lime-600 font-extrabold text-xl mx-1 px-1 bg-lime-50 rounded">溫馨接送服務</span>。我們了解跨區就醫的不便，因此特別規劃了舒適安全的交通車隊，由經驗豐富的駕駛大哥協助，讓長輩與行動不便的腎友能準時、平安地往返診所與住家，家屬也能更放心。
                   </p>
                   <div className="mt-6">
                      <a 
                        href={`tel:${CLINIC_INFO.phone}`}
                        className="inline-flex items-center gap-2 text-cyan-700 font-bold hover:text-cyan-500 transition-colors border-b-2 border-cyan-100 hover:border-cyan-400 pb-0.5"
                      >
                        <Phone className="w-4 h-4" />
                        洽詢接送範圍：{CLINIC_INFO.phone}
                      </a>
                   </div>
                </div>

                {/* Public Transport Info */}
                <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 space-y-6">
                   <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">大眾運輸方式</h3>
                   
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600">
                         <Train className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 text-lg">搭乘捷運</h4>
                         <p className="text-slate-600 mt-1">
                           高雄捷運紅線至<span className="font-bold text-red-500 mx-1">高雄國際機場站 (R4)</span>，由 1 號出口出站，步行約 6-8 分鐘即可抵達。
                         </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                         <Bus className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 text-lg">搭乘公車</h4>
                         <p className="text-slate-600 mt-1">
                           可搭乘 12、69、紅3 等路線公車，至「小港站」或「機場站」下車。
                         </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
                         <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 text-lg">自行開車</h4>
                         <p className="text-slate-600 mt-1">
                           診所位於沿海一路上，周邊設有停車格，停車方便。
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Large Map */}
             <div className="md:col-span-7 h-[500px] md:h-auto bg-slate-200 rounded-3xl overflow-hidden shadow-xl border-4 border-white animate-in slide-in-from-right duration-700 relative">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="高健診所詳細地圖"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(CLINIC_INFO.address)}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 filter hover:contrast-110 transition-all"
                ></iframe>
                
                {/* Address Tag Overlay */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 max-w-xs">
                   <p className="font-bold text-cyan-900 text-lg mb-1">{CLINIC_INFO.name}</p>
                   <p className="text-slate-600 text-sm flex items-start gap-1">
                     <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                     {CLINIC_INFO.address}
                   </p>
                   <a 
                     href={CLINIC_INFO.mapLink}
                     target="_blank"
                     rel="noreferrer"
                     className="mt-3 block text-center bg-cyan-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-cyan-700 transition-colors"
                   >
                     開啟 Google 導航
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrafficGuide;