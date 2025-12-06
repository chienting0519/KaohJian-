
import React, { useState, useRef, useEffect } from 'react';
import { KIDNEY_SYMPTOMS, CLINIC_INFO } from '../constants';
import { AlertCircle, CheckCircle2, ArrowRight, RotateCcw, AlertTriangle, Cloud, Wind, Droplets, Sparkles, Leaf } from 'lucide-react';

const KidneyCheck: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [noSymptoms, setNoSymptoms] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (id: string) => {
    if (!answers[id]) {
      setNoSymptoms(false);
    }
    setAnswers(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      if (Object.values(newState).some(v => v)) {
        setError(null);
      }
      return newState;
    });
  };

  const handleNoSymptomsCheck = () => {
    setNoSymptoms(prev => {
      const newState = !prev;
      if (newState) {
        setAnswers({});
        setError(null);
      }
      return newState;
    });
  };

  const handleShowResult = () => {
    const hasChecked = Object.values(answers).some(v => v);
    if (!hasChecked && !noSymptoms) {
      setError('請勾選您符合的症狀項目，或是勾選「我完全沒有以上症狀」，才能為您進行分析喔！');
      return;
    }
    setError(null);
    setShowResult(true);
  };

  const calculateRisk = () => {
    let score = 0;
    Object.keys(answers).forEach(key => {
      if (answers[key]) {
        const symptom = KIDNEY_SYMPTOMS.find(s => s.id === key);
        if (symptom) score += symptom.riskWeight;
      }
    });
    return score;
  };

  const resetTest = () => {
    setAnswers({});
    setNoSymptoms(false);
    setShowResult(false);
    setError(null);
  };

  // 當顯示結果時，自動捲動到卡片頂端
  useEffect(() => {
    if (showResult && containerRef.current) {
      // 計算位置，預留頂部 Header 的空間 (約 100px)
      const yOffset = -100; 
      const element = containerRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [showResult]);

  const score = calculateRisk();
  
  const getRiskResult = (score: number) => {
    if (score === 0) return { 
      level: '低風險', 
      color: 'text-lime-600', 
      bg: 'bg-lime-50', 
      border: 'border-lime-200',
      iconColor: 'text-lime-500',
      msg: '您的腎臟健康狀況目前看起來良好。\n建議定期利用本診所的免費成人健檢持續追蹤。\n高健診所關心您的健康' 
    };
    if (score <= 3) return { 
      level: '中度風險', 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconColor: 'text-yellow-500',
      msg: '您有一些腎臟病的潛在警訊。建議您預約門診，進行尿液與血液檢查以求安心。' 
    };
    return { 
      level: '高度風險', 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconColor: 'text-red-500',
      msg: '您的症狀顯示腎臟可能承受較大壓力。強烈建議您立即預約高健診所的腎臟專科醫師進行詳細檢查。' 
    };
  };

  const result = getRiskResult(score);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="p-8 bg-cyan-700 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-lime-500 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>
        <h2 className="text-3xl font-bold mb-2 relative z-10 tracking-wide">互動式腎臟健康檢測</h2>
        <p className="text-cyan-100 relative z-10 font-medium">花一分鐘檢視您的身體訊號，預防勝於治療</p>
      </div>

      {!showResult ? (
        <div className="p-4 sm:p-8">
          
          {/* 宮崎駿風格衛教區塊 (Ghibli Style) */}
          <div className="mb-12 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            
            {/* 1. 知識卡：自然的過濾器 (Watercolor Card) */}
            <div className="bg-gradient-to-br from-[#e0f7fa] to-[#e8f5e9] rounded-3xl p-6 shadow-md border border-white relative overflow-hidden group">
               {/* Decorative Background Elements */}
               <div className="absolute top-0 left-0 w-full h-full opacity-40 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
               <Cloud className="absolute top-4 right-8 text-white w-16 h-16 opacity-60 animate-pulse" />
               <Wind className="absolute bottom-4 left-8 text-cyan-200 w-12 h-12 opacity-50" />
               
               <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-cyan-100">
                     <Droplets className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                     <div className="inline-block bg-[#2d6a4f] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-2 shadow-sm">
                        生命之河
                     </div>
                     <h3 className="text-2xl font-bold text-[#1b4332] mb-2 font-sans">
                        腎臟，是身體裡的清流
                     </h3>
                     <p className="text-[#40916c] text-lg font-medium leading-relaxed">
                       就像森林裡的河流能帶走落葉與泥沙，
                       腎臟這條<span className="text-cyan-600 font-bold bg-white/50 px-1 rounded">24小時不間斷的河流</span>，
                       負責沖刷身體的毒素。當河流堵塞時，森林就會生病。
                     </p>
                  </div>
               </div>
            </div>

            {/* 2. 四格漫畫小劇場 - Ghibli Layout with Character Emojis */}
            <div className="bg-[#fcfdfc] p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-lg relative">
               {/* Tape Element */}
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/50 rotate-1 backdrop-blur-sm shadow-sm border border-white"></div>
               
               <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-[#2d6a4f] tracking-wide flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                    森林診所的悄悄話
                    <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                  </h3>
               </div>

               <div className="grid md:grid-cols-4 gap-4">
                  
                  {/* Panel 1: The Bear (Strong but oblivious) */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col items-center hover:-translate-y-1 transition-transform duration-500">
                     <div className="w-full aspect-[4/3] bg-gradient-to-t from-orange-50 to-white rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-orange-100">
                        {/* Bear Emoji representing a Totoro-like strong creature */}
                        <span className="text-6xl drop-shadow-sm filter contrast-125 transform hover:scale-110 transition-transform cursor-default">🐻</span>
                        <div className="absolute bottom-0 w-full h-1 bg-[#88c999]/30"></div>
                     </div>
                     <div className="bg-[#fff9e6] rounded-xl p-3 w-full text-center relative border border-[#ffeeba]">
                         <p className="text-sm font-bold text-slate-700 leading-snug">
                           「我是森林裡的大熊，強壯得很，不用檢查啦！」
                         </p>
                     </div>
                  </div>

                  {/* Panel 2: The Girl (Wisdom/Healer) */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col items-center hover:-translate-y-1 transition-transform duration-500 delay-100">
                     <div className="w-full aspect-[4/3] bg-gradient-to-t from-blue-50 to-white rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-blue-100">
                        {/* Girl Emoji representing the spirited protagonist */}
                        <span className="text-6xl drop-shadow-sm transform hover:rotate-6 transition-transform cursor-default">👧</span>
                        <Cloud className="absolute top-2 right-2 text-white w-6 h-6 opacity-80" />
                     </div>
                     <div className="bg-[#e3f2fd] rounded-xl p-3 w-full text-center relative border border-[#bbdefb]">
                         <p className="text-sm font-bold text-slate-700 leading-snug">
                           「大熊先生，腎臟就像<span className="text-cyan-600">樹的根</span>。生病時是不會喊痛的喔！」
                         </p>
                     </div>
                  </div>

                  {/* Panel 3: Soot Sprites (Hidden Danger) */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col items-center hover:-translate-y-1 transition-transform duration-500 delay-200">
                     <div className="w-full aspect-[4/3] bg-gradient-to-t from-slate-100 to-white rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-slate-200 group/panel3">
                        {/* Black Circles representing Makkuro Kurosuke (Soot Sprites) */}
                        <div className="relative">
                            <span className="text-4xl absolute -left-6 top-2 animate-bounce delay-75 opacity-80">⚫</span>
                            <span className="text-5xl relative z-10 animate-bounce">⚫</span>
                            <span className="text-3xl absolute -right-5 bottom-0 animate-bounce delay-150 opacity-80">⚫</span>
                        </div>
                        <Wind className="absolute bottom-2 left-2 text-slate-300 w-8 h-8 animate-pulse" />
                     </div>
                     <div className="bg-[#f5f5f5] rounded-xl p-3 w-full text-center relative border border-slate-200">
                         <p className="text-sm font-bold text-slate-600 leading-snug">
                           「就像灰塵精靈(毒素)悄悄堆積... 等發現時通常太晚了。」
                         </p>
                     </div>
                  </div>

                  {/* Panel 4: Sprout (Magic/Health) */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col items-center hover:-translate-y-1 transition-transform duration-500 delay-300">
                     <div className="w-full aspect-[4/3] bg-gradient-to-t from-lime-50 to-white rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-lime-100">
                        {/* Sprout Emoji representing growth/Totoro's tree magic */}
                        <span className="text-6xl drop-shadow-sm animate-pulse cursor-default">🌱</span>
                        <Sparkles className="absolute top-2 left-2 text-yellow-400 w-5 h-5 animate-pulse" />
                        <Leaf className="absolute bottom-2 right-2 text-lime-400 w-4 h-4 opacity-50 rotate-45" />
                     </div>
                     <div className="bg-[#f1f8e9] rounded-xl p-3 w-full text-center relative border border-[#dcedc8]">
                         <p className="text-sm font-bold text-[#33691e] leading-snug">
                           「施展『定期檢查』的魔法，讓身體的森林永遠翠綠！」
                         </p>
                     </div>
                  </div>

               </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-400 justify-center pt-2">
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="font-medium text-slate-500">往下滑動，聆聽身體的聲音</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            </div>
          </div>

          <div className="bg-white border-t border-slate-100 pt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-cyan-500 rounded mr-3"></span>
              請勾選您最近是否有以下狀況：
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {KIDNEY_SYMPTOMS.map((symptom) => (
                <label 
                  key={symptom.id} 
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${answers[symptom.id] ? 'bg-cyan-50 border-cyan-500 shadow-md transform -translate-y-0.5' : 'hover:bg-slate-50 border-slate-200'}`}
                >
                  <div className={`w-7 h-7 rounded-lg border-2 mr-3 flex items-center justify-center transition-colors flex-shrink-0 ${answers[symptom.id] ? 'bg-cyan-500 border-cyan-500' : 'border-slate-300 bg-white'}`}>
                    {answers[symptom.id] && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={!!answers[symptom.id]}
                    onChange={() => handleToggle(symptom.id)}
                  />
                  <span className={`text-lg ${answers[symptom.id] ? 'text-cyan-900 font-bold' : 'text-slate-700 font-medium'}`}>
                    {symptom.question}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-6">
            
            <label 
              className={`flex items-center px-8 py-4 border rounded-full cursor-pointer transition-all duration-200 ${noSymptoms ? 'bg-lime-50 border-lime-500 shadow-md' : 'hover:bg-slate-50 border-slate-300'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${noSymptoms ? 'bg-lime-500 border-lime-500' : 'border-slate-400 bg-white'}`}>
                {noSymptoms && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={noSymptoms}
                onChange={handleNoSymptomsCheck}
              />
              <span className={`text-lg ${noSymptoms ? 'text-lime-800 font-bold' : 'text-slate-600 font-bold'}`}>
                我完全沒有以上症狀
              </span>
            </label>

            <button
              onClick={handleShowResult}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-16 rounded-full transition-all duration-300 shadow-lg shadow-cyan-200 hover:shadow-xl flex items-center gap-3 text-xl transform hover:-translate-y-1 active:scale-95"
            >
              查看分析結果 <ArrowRight className="w-6 h-6" />
            </button>
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1 shadow-sm">
                 <AlertTriangle className="w-5 h-5" />
                 {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 flex flex-col items-center text-center animate-fade-in">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 ${result.bg} shadow-inner`}>
            {score === 0 ? <CheckCircle2 className={`w-16 h-16 ${result.iconColor}`} /> : <AlertCircle className={`w-16 h-16 ${result.iconColor}`} />}
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-2">檢測結果：<span className={result.color}>{result.level}</span></h3>
          <div className={`p-8 rounded-2xl ${result.bg} ${result.border} border mb-10 max-w-2xl w-full text-left shadow-sm`}>
            <p className="text-slate-800 text-xl leading-loose whitespace-pre-line font-medium">{result.msg}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-lg">
            <a 
              href={CLINIC_INFO.bookingLink} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#06c755] hover:bg-[#05b34c] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 hover:-translate-y-1 flex-1 text-lg"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-6 h-6" />
              <span>立即 Line 預約掛號</span>
            </a>
            <button
              onClick={resetTest}
              className="bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-400 font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 flex-1 text-lg"
            >
              <RotateCcw className="w-5 h-5" /> 重新檢測
            </button>
          </div>
          <p className="mt-8 text-sm text-slate-400">本檢測僅供參考，無法取代專業醫師診斷。如有身體不適請務必就醫。</p>
        </div>
      )}
    </div>
  );
};

export default KidneyCheck;
