import React from 'react';

const ScheduleTables: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4 lg:gap-8 font-sans items-stretch">
      
        {/* Dialysis Schedule */}
        <div className="rounded-xl overflow-hidden shadow-md bg-white border border-cyan-100 ring-1 ring-cyan-50 h-full flex flex-col">
          <div className="bg-cyan-600 py-4 px-4 text-white text-center shadow-sm relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full blur-xl transform translate-x-4 -translate-y-4"></div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-[0.2em] leading-snug drop-shadow-sm relative z-10">洗 腎 透 析 時 段</h3>
          </div>
          
          <div className="w-full text-slate-700 flex-1 flex flex-col text-sm">
              {/* Header Row */}
              <div className="flex bg-cyan-50 border-b border-cyan-100 font-bold text-cyan-800 flex-shrink-0">
                  <div className="w-24 py-3 text-center flex-shrink-0 border-r border-cyan-100">時段</div>
                  <div className="flex-1 grid grid-cols-2">
                      <div className="py-3 text-center border-r border-cyan-100">星期</div>
                      <div className="py-3 text-center">時間</div>
                  </div>
              </div>

              {/* Early Shift */}
              <div className="flex-1 flex border-b border-slate-100 bg-white items-stretch hover:bg-cyan-50/30 transition-colors group">
                  <div className="w-24 flex items-center justify-center text-cyan-600 font-bold text-base flex-shrink-0 border-r border-slate-100 bg-cyan-50/10 group-hover:bg-cyan-50/50 transition-colors py-4">
                      早 班
                  </div>
                  <div className="flex-1 grid grid-cols-2 items-center">
                      <div className="flex items-center justify-center font-bold text-slate-700 border-r border-slate-100 h-full px-2">週一 至 週六</div>
                      <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-slate-800 tracking-wider px-2">07:00 - 11:30</div>
                  </div>
              </div>

              {/* Noon Shift */}
              <div className="flex-1 flex border-b border-slate-100 bg-white items-stretch hover:bg-cyan-50/30 transition-colors group">
                  <div className="w-24 flex items-center justify-center text-cyan-600 font-bold text-base flex-shrink-0 border-r border-slate-100 bg-cyan-50/10 group-hover:bg-cyan-50/50 transition-colors py-4">
                      午 班
                  </div>
                  <div className="flex-1 grid grid-cols-2 items-center">
                      <div className="flex items-center justify-center font-bold text-slate-700 border-r border-slate-100 h-full px-2">週一 至 週六</div>
                      <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-slate-800 tracking-wider px-2">11:30 - 16:30</div>
                  </div>
              </div>

              {/* Late Shift */}
              <div className="flex-1 flex bg-white items-stretch hover:bg-cyan-50/30 transition-colors group">
                  <div className="w-24 flex items-center justify-center text-cyan-600 font-bold text-base flex-shrink-0 border-r border-slate-100 bg-cyan-50/10 group-hover:bg-cyan-50/50 transition-colors py-4">
                      晚 班
                  </div>
                  <div className="flex-1 grid grid-cols-2 items-center">
                      <div className="flex items-center justify-center font-bold text-slate-700 border-r border-slate-100 h-full px-2">週一、三、五</div>
                      <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-slate-800 tracking-wider px-2">16:30 - 22:00</div>
                  </div>
              </div>
          </div>
        </div>

        {/* Outpatient Schedule */}
        <div className="rounded-xl overflow-hidden shadow-md bg-white border border-lime-100 ring-1 ring-lime-50 h-full flex flex-col">
          <div className="bg-[#a3d154] py-4 px-4 text-white text-center shadow-sm relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full blur-xl transform translate-x-4 -translate-y-4"></div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-[0.2em] leading-snug drop-shadow-sm relative z-10">門 診 時 段</h3>
          </div>
          
          <div className="w-full text-slate-700 flex-1 flex flex-col text-sm">
              {/* Header Row */}
              <div className="flex bg-[#f4f9eb] border-b border-lime-100 font-bold text-[#6a8c2d] flex-shrink-0">
                  <div className="w-24 py-3 text-center flex-shrink-0 border-r border-lime-100">時段</div>
                  <div className="flex-1 grid grid-cols-2">
                      <div className="py-3 text-center border-r border-lime-100">星期</div>
                      <div className="py-3 text-center">時間</div>
                  </div>
              </div>

              {/* Morning */}
              <div className="flex-1 flex border-b border-slate-100 bg-white items-stretch hover:bg-lime-50/30 transition-colors group">
                  <div className="w-24 flex items-center justify-center text-[#8cc63f] font-bold text-base flex-shrink-0 border-r border-slate-100 bg-lime-50/10 group-hover:bg-lime-50/50 transition-colors py-4">
                      早 診
                  </div>
                  <div className="flex-1 grid grid-cols-2 items-center">
                      <div className="flex items-center justify-center font-bold text-slate-700 border-r border-slate-100 h-full px-2">週一 至 週六</div>
                      <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-slate-800 tracking-wider px-2">09:30 - 12:00</div>
                  </div>
              </div>

              {/* Afternoon - Special Logic for sub-rows but keeping main block consistent */}
              <div className="flex-1 flex border-b border-slate-100 bg-white items-stretch hover:bg-lime-50/30 transition-colors group">
                  <div className="w-24 flex items-center justify-center text-[#8cc63f] font-bold text-base flex-shrink-0 border-r border-slate-100 bg-lime-50/10 group-hover:bg-lime-50/50 transition-colors py-4">
                      午 診
                  </div>
                  <div className="flex-1 flex flex-col justify-center h-full">
                      {/* Mon Wed Fri */}
                      <div className="grid grid-cols-2 flex-1 items-center border-b border-slate-100">
                          <div className="flex items-center justify-center font-bold text-slate-700 border-r border-slate-100 h-full px-2 py-1">週一、三、五</div>
                          <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-slate-800 tracking-wider px-2 py-1">14:00 - 17:00</div>
                      </div>
                      {/* Tue Sat */}
                      <div className="grid grid-cols-2 flex-1 items-center border-b border-slate-100 bg-orange-50/50">
                          <div className="flex flex-col items-center justify-center border-r border-slate-100 h-full px-2 py-1">
                               <span className="font-bold text-orange-700">週二、週六</span>
                               <span className="text-[10px] bg-orange-200 text-orange-800 px-1.5 rounded-full font-bold mt-0.5 shadow-sm scale-90">中午不休息</span>
                          </div>
                          <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-orange-700 tracking-wider px-2 py-1">
                              12:00 - 16:00
                          </div>
                      </div>
                      {/* Thu */}
                      <div className="grid grid-cols-2 flex-1 items-center">
                          <div className="flex items-center justify-center font-bold text-slate-700 border-r border-slate-100 h-full px-2 py-1">週四</div>
                          <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-slate-800 tracking-wider px-2 py-1">14:00 - 16:30</div>
                      </div>
                  </div>
              </div>

              {/* Evening */}
              <div className="flex-1 flex bg-white items-stretch hover:bg-lime-50/30 transition-colors group">
                  <div className="w-24 flex items-center justify-center text-[#8cc63f] font-bold text-base flex-shrink-0 border-r border-slate-100 bg-lime-50/10 group-hover:bg-lime-50/50 transition-colors py-4">
                      晚 診
                  </div>
                  <div className="flex-1 grid grid-cols-2 items-center">
                      <div className="flex items-center justify-center font-bold text-slate-700 border-r border-slate-100 h-full px-2">週一、三、五</div>
                      <div className="flex items-center justify-center font-mono font-bold text-base sm:text-lg text-slate-800 tracking-wider px-2">18:00 - 21:00</div>
                  </div>
              </div>
          </div>
        </div>
        
      </div>
      <p className="text-xs text-slate-400 text-center mt-4">※ 國定假日或特殊異動請參照診所最新公告</p>
    </div>
  );
};

export default ScheduleTables;