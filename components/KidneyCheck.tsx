
import React, { useState, useRef, useEffect } from 'react';
import { KIDNEY_SYMPTOMS, CLINIC_INFO } from '../constants';
import { AlertCircle, CheckCircle2, ArrowRight, Leaf, AlertTriangle, RotateCcw, User, Stethoscope, UserRound } from 'lucide-react';

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
          
          {/* 宮崎駿風格衛教區塊 (Ghibli Style Layout with Flat Icons) */}
          <div className="mb-12 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            
            {/* 1. 衛教短文：自然的過濾器 */}
            <div className="bg-[#f4fcf0] rounded-3xl p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-[#e0ebd4] relative overflow-hidden">
               {/* 裝飾性背景元素：像森林光斑 */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-lime-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 -translate-y-1/2 translate-x-1/4"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 translate-y-1/2 -translate-x-1/4"></div>
               
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-[#4a6b45] tracking-wide flex items-center gap-2">
                        <Leaf className="w-6 h-6" />
                        身體裡的生命之河
                    </h3>
                 </div>
                 
                 <div className="text-[#556b4f] font-medium leading-relaxed space-y-4 text-lg">
                    <p>
                      如果把我們的身體比喻成一座生意盎然的森林，那麼<strong>腎臟</strong>就像是森林裡那條負責淨化水源的<strong>河流</strong>。
                      它安靜地將血液中的代謝廢物沖刷帶走，讓身體保持純淨與平衡。
                    </p>
                    <p className="flex items-start gap-4 bg-white/80 p-5 rounded-2xl border border-[#e0ebd4] shadow-sm text-[#6b7c62]">
                       <AlertCircle className="w-6 h-6 text-[#e6b89c] flex-shrink-0 mt-0.5" />
                       <span>
                         然而，這條河流非常「沈默」。當過濾網受損、河水開始混濁時，它通常<strong>不會發出疼痛的訊號</strong>。
                         這就是為什麼許多人直到身體嚴重水腫、極度疲倦時，才驚覺腎臟生病了。
                       </span>
                    </p>
                 </div>
               </div>
            </div>

            {/* 2. 醫師與病患對話小劇場 (Updated to Lucide Icons) */}
            <div className="relative">
               <div className="text-center mb-8">
                  <span className="inline-block px-6 py-2 rounded-full bg-[#f0f4f8] text-[#5c7c8a] text-sm font-bold border border-[#dce5eb] shadow-sm tracking-widest">
                    診間裡的悄悄話
                  </span>
               </div>

               <div className="space-y-10 max-w-3xl mx-auto">
                  
                  {/* Scene 1: Patient (Uncle) */}
                  <div className="flex items-start gap-4 sm:gap-8 group">
                     {/* Icon Avatar: Uncle */}
                     <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative z-10 transition-transform hover:scale-105 duration-300">
                        <div className="w-full h-full rounded-full bg-lime-100 border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden">
                           <User className="w-16 h-16 text-lime-600 absolute bottom-0 translate-y-2" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200 shadow-sm">伯伯</div>
                     </div>
                     
                     {/* Dialogue Bubble */}
                     <div className="flex-1 bg-white p-6 rounded-3xl rounded-tl-none shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] border border-[#eef2f5] relative mt-4 group-hover:border-[#ffdcb8] transition-colors">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-white border-l border-t border-[#eef2f5] transform -rotate-45 group-hover:border-[#ffdcb8] transition-colors"></div>
                        <p className="text-[#546e7a] font-bold text-lg leading-relaxed">
                           「醫生啊，我平常身體硬朗得很！<br/>
                           雖然最近<span className="text-[#d97706] bg-[#fff3e0] px-1 rounded">小便泡泡</span>多了點，人容易累，但應該只是年紀大了吧？真的有必要做檢查嗎？」
                        </p>
                     </div>
                  </div>

                  {/* Scene 2: Doctor (Male) */}
                  <div className="flex items-start gap-4 sm:gap-8 flex-row-reverse group">
                     {/* Icon Avatar: Doctor */}
                     <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative z-10 transition-transform hover:scale-105 duration-300">
                        <div className="w-full h-full rounded-full bg-cyan-100 border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden">
                           <div className="absolute top-2 right-1/2 translate-x-1/2 z-20 bg-white rounded-full p-1 shadow-sm">
                              <Stethoscope className="w-5 h-5 text-cyan-600" />
                           </div>
                           <UserRound className="w-16 h-16 text-cyan-600 absolute bottom-0 translate-y-1" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-cyan-600 border border-cyan-100 shadow-sm">醫師</div>
                     </div>
                     
                     {/* Dialogue Bubble */}
                     <div className="flex-1 bg-[#f0f9ff] p-6 rounded-3xl rounded-tr-none shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] border border-[#e0f2fe] relative mt-4 group-hover:border-[#bde0fe] transition-colors">
                        <div className="absolute -right-2.5 top-0 w-5 h-5 bg-[#f0f9ff] border-r border-t border-[#e0f2fe] transform rotate-45 group-hover:border-[#bde0fe] transition-colors"></div>
                        <p className="text-[#0c4a6e] font-bold text-lg leading-relaxed">
                           「伯伯，其實<span className="text-[#0369a1] bg-white px-1.5 rounded mx-1 shadow-sm">泡泡尿</span>和<span className="text-[#0369a1] bg-white px-1.5 rounded mx-1 shadow-sm">不明疲倦</span>正是腎臟發出的求救訊號喔！<br/>
                           因為腎臟不會痛，我們更要透過檢查來傾聽它的聲音。來，我們花 1 分鐘做個快速檢測，早期發現就能早期保養！」
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center justify-center pt-8">
                <div className="flex flex-col items-center animate-bounce text-slate-300">
                    <span className="text-sm font-bold mb-1 tracking-wider text-[#7fb069]">一分鐘檢測腎臟健康</span>
                    <ArrowRight className="w-6 h-6 rotate-90 text-[#7fb069]" />
                </div>
            </div>
          </div>

          <div className="bg-white border-t border-slate-100 pt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-cyan-50 rounded mr-3"></span>
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
              <span className={`text-lg font-bold ${noSymptoms ? 'text-lime-700' : 'text-slate-500'}`}>
                我完全沒有以上症狀，身體狀況良好
              </span>
            </label>

            <button
              onClick={handleShowResult}
              className="group relative bg-cyan-600 hover:bg-cyan-500 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                開始分析風險
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-lg animate-bounce">
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold">{error}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
          <div className={`rounded-2xl p-8 border-2 ${result.border} ${result.bg} mb-8 text-center`}>
            <div className={`w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border-2 ${result.border}`}>
              {score === 0 ? <CheckCircle2 className={`w-10 h-10 ${result.iconColor}`} /> : <AlertTriangle className={`w-10 h-10 ${result.iconColor}`} />}
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${result.color}`}>
              風險評估：{result.level}
            </h3>
            <div className="w-16 h-1 bg-current opacity-20 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-slate-700 font-bold whitespace-pre-line leading-relaxed">
              {result.msg}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetTest}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              重新檢測
            </button>
            <a
              href={CLINIC_INFO.bookingLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#06c755] hover:bg-[#05b34c] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
              立即 Line 預約諮詢
            </a>
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-sm text-slate-400">
               本檢測結果僅供衛教參考，不能取代專業醫師診斷。<br/>
               若有任何身體不適，請務必尋求專業醫療協助。
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidneyCheck;
