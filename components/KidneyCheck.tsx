import React, { useState, useRef, useEffect } from 'react';
import { KIDNEY_SYMPTOMS, CLINIC_INFO } from '../constants';
import { AlertCircle, CheckCircle2, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';

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
    <div ref={containerRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="p-8 bg-cyan-700 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-lime-500 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">互動式腎臟健康檢測</h2>
        <p className="text-cyan-100 relative z-10">花一分鐘檢視您的身體訊號，預防勝於治療</p>
      </div>

      {!showResult ? (
        <div className="p-8">
          <p className="mb-6 text-slate-600 font-medium border-l-4 border-lime-500 pl-3">請勾選您最近是否有以下狀況：</p>
          <div className="grid md:grid-cols-2 gap-4">
            {KIDNEY_SYMPTOMS.map((symptom) => (
              <label 
                key={symptom.id} 
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${answers[symptom.id] ? 'bg-cyan-50 border-cyan-500 shadow-md transform -translate-y-0.5' : 'hover:bg-slate-50 border-slate-200'}`}
              >
                <div className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center transition-colors ${answers[symptom.id] ? 'bg-cyan-600 border-cyan-600' : 'border-slate-300 bg-white'}`}>
                  {answers[symptom.id] && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={!!answers[symptom.id]}
                  onChange={() => handleToggle(symptom.id)}
                />
                <span className={`${answers[symptom.id] ? 'text-cyan-900 font-bold' : 'text-slate-700'}`}>
                  {symptom.question}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            
            <label 
              className={`flex items-center px-6 py-3 border rounded-full cursor-pointer transition-all duration-200 ${noSymptoms ? 'bg-cyan-50 border-cyan-500 shadow-sm' : 'hover:bg-slate-50 border-slate-300'}`}
            >
              <div className={`w-5 h-5 rounded border mr-2 flex items-center justify-center transition-colors ${noSymptoms ? 'bg-cyan-600 border-cyan-600' : 'border-slate-400 bg-white'}`}>
                {noSymptoms && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={noSymptoms}
                onChange={handleNoSymptomsCheck}
              />
              <span className={`${noSymptoms ? 'text-cyan-900 font-bold' : 'text-slate-600 font-medium'}`}>
                我完全沒有以上症狀
              </span>
            </label>

            <button
              onClick={handleShowResult}
              className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-lime-500/40 flex items-center gap-2 text-lg transform hover:-translate-y-1"
            >
              查看分析結果 <ArrowRight className="w-5 h-5" />
            </button>
            
            {error && (
              <div className="flex items-center gap-2 text-orange-600 font-bold bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 animate-in fade-in slide-in-from-top-1">
                 <AlertTriangle className="w-5 h-5" />
                 {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 flex flex-col items-center text-center animate-fade-in">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${result.bg} shadow-inner`}>
            {score === 0 ? <CheckCircle2 className={`w-14 h-14 ${result.iconColor}`} /> : <AlertCircle className={`w-14 h-14 ${result.iconColor}`} />}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">檢測結果：<span className={result.color}>{result.level}</span></h3>
          <div className={`p-6 rounded-xl ${result.bg} ${result.border} border mb-8 max-w-2xl`}>
            <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-line">{result.msg}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a 
              href={CLINIC_INFO.bookingLink} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#06c755] hover:bg-[#05b34c] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:shadow-lg"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
              <span>立即 Line 預約掛號</span>
            </a>
            <button
              onClick={resetTest}
              className="bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> 重新檢測
            </button>
          </div>
          <p className="mt-6 text-xs text-slate-400">本檢測僅供參考，無法取代專業醫師診斷。如有身體不適請務必就醫。</p>
        </div>
      )}
    </div>
  );
};

export default KidneyCheck;