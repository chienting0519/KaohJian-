import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, Phone } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { CLINIC_INFO } from '../constants';

interface AIChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好！我是高健診所的 AI 腎臟健康助理。\n\n為了您的健康，我會協助您解答關於 **洗腎飲食**、**門診時間** 或 **預約掛號** 的問題。\n\n請問有什麼我可以幫您的嗎？', timestamp: new Date() }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Core logic to process a message (whether typed or clicked)
  const processMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setIsLoading(true);

    // Add user message to state
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);

    // Build history context string
    const historyContext = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`);

    // API Call
    const responseText = await sendMessageToGemini(userMsg, historyContext);

    // Add model response
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    setIsLoading(false);
  };

  // Handle the Send button click (for typed input)
  const handleSendInput = async () => {
    if (!input.trim()) return;
    const msg = input;
    setInput(''); // Clear input immediately
    await processMessage(msg);
  };

  // Helper function to render text with styling
  const formatMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const trimmedLine = line.trim();
      const isBullet = trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ');
      const content = isBullet ? trimmedLine.substring(2) : line;

      // Split by special tokens:
      // 1. **text** -> Interactive Button
      // 2. [[text]] -> Red Warning Text
      // 3. Links -> Booking Button
      const parts = content.split(/(\*\*.*?\*\*|\[\[.*?\]\]|\[.*?\]\(https:\/\/lin\.ee\/RIY5AtG\)|https:\/\/lin\.ee\/RIY5AtG)/g);

      const renderedParts = parts.map((part, partIdx) => {
        // Handle [[Warning]] -> Red Text (Bold & Red)
        if (part.startsWith('[[') && part.endsWith(']]')) {
            const warning = part.slice(2, -2);
            return (
                <span key={partIdx} className="text-red-600 font-extrabold mx-0.5 px-1 bg-red-50 rounded border border-red-100 shadow-sm text-[1.05em]">
                    {warning}
                </span>
            );
        }

        // Handle **Button** -> Clickable Keyword
        if (part.startsWith('**') && part.endsWith('**')) {
          const keyword = part.slice(2, -2);
          return (
            <button 
              key={partIdx} 
              onClick={() => processMessage(keyword)}
              disabled={isLoading}
              className="inline-block font-bold text-cyan-700 cursor-pointer bg-cyan-50 hover:bg-cyan-100 border-b border-cyan-200 hover:border-cyan-400 rounded px-1.5 py-0.5 mx-0.5 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              title={`點擊詢問關於「${keyword}」的資訊`}
            >
              {keyword}
            </button>
          );
        }
        
        // Handle Booking Link
        if (part === 'https://lin.ee/RIY5AtG' || (part.startsWith('[') && part.includes('https://lin.ee/RIY5AtG'))) {
          return (
            <div key={partIdx} className="block my-4 w-full">
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                <a 
                  href="https://lin.ee/RIY5AtG" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-8 py-3 rounded-lg text-base font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
                  立即 Line 預約掛號
                </a>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3 font-medium">
                  <Phone className="w-3 h-3 text-cyan-600" />
                  <span>預約專線:</span>
                  <span className="font-mono font-bold text-slate-700">{CLINIC_INFO.phone}</span>
                </div>
              </div>
            </div>
          );
        }
        
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 mb-3 pl-1">
            <span className="mt-2.5 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0"></span>
            <span className="flex-1 leading-7 text-slate-700">{renderedParts}</span>
          </div>
        );
      }

      if (!trimmedLine) {
        return <div key={lineIdx} className="h-2"></div>;
      }

      return <div key={lineIdx} className="mb-3 leading-7 text-slate-700">{renderedParts}</div>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl mb-4 w-[90vw] sm:w-[380px] max-h-[600px] h-[550px] flex flex-col border border-cyan-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in-20 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-700 to-cyan-600 p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-wide text-white">高健 AI 助理</h3>
                <span className="text-[11px] text-cyan-50 flex items-center gap-1.5 opacity-90 font-light">
                  <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]"></span> 
                  腎臟專科諮詢中
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-6 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center mr-2 flex-shrink-0 self-start mt-1 shadow-sm">
                        <Bot className="w-5 h-5 text-cyan-700" />
                    </div>
                )}
                <div 
                  className={`max-w-[88%] rounded-2xl px-5 py-4 text-[15px] shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-cyan-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.role === 'user' ? msg.text : formatMessage(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot className="w-5 h-5 text-cyan-700" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-600" />
                  <span className="text-sm text-slate-500">AI 正在思考您的問題...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendInput()}
                placeholder="請輸入您的健康問題..."
                className="flex-1 bg-slate-100 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm transition-all placeholder:text-slate-400"
              />
              <button 
                onClick={handleSendInput}
                disabled={!input.trim() || isLoading}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white rounded-xl px-4 py-2 transition-colors shadow-sm flex items-center justify-center w-12"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2">AI 建議僅供參考，急症請務必直接就醫。</p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-cyan-600 hover:bg-cyan-700 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-3 pr-6 hover:-translate-y-1"
        >
          <div className="relative">
             <MessageCircle className="w-7 h-7" />
             <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-cyan-600 animate-pulse"></span>
          </div>
          <div className="text-left">
            <div className="text-xs text-cyan-200 font-medium mb-0.5">有問題嗎？</div>
            <div className="text-base font-bold tracking-wide">詢問 AI 助理</div>
          </div>
        </button>
      )}
    </div>
  );
};

export default AIChat;