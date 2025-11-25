import React, { useState } from 'react';
import { KIDNEY_SYMPTOMS, CLINIC_INFO } from '../constants';
import { AlertCircle, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';

const KidneyCheck: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const handleToggle = (id: string) => {
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
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
    setShowResult(false);
  };

  const score = calculateRisk();
  
  const getRiskResult = (score: number) => {
    if (score === 0) return { 
      level: '低風險', 
      color: 'text-lime-600', 
      bg: 'bg-lime-50', 
      border: 'border-lime-200',
      iconColor: 'text-lime-500',
      msg: '您的腎臟健康狀況目前看起來良好。建議定期利用本診所的免費成人健檢持續追蹤。' 
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
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
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
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowResult(true)}
              className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-lime-500/40 flex items-center gap-2 text-lg transform hover:-translate-y-1"
            >
              查看分析結果 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 flex flex-col items-center text-center animate-fade-in">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${result.bg} shadow-inner`}>
            {score === 0 ? <CheckCircle2 className={`w-14 h-14 ${result.iconColor}`} /> : <AlertCircle className={`w-14 h-14 ${result.iconColor}`} />}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">檢測結果：<span className={result.color}>{result.level}</span></h3>
          <div className={`p-6 rounded-xl ${result.bg} ${result.border} border mb-8 max-w-2xl`}>
            <p className="text-slate-800 text-lg leading-relaxed">{result.msg}</p>
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