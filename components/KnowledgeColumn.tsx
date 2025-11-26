
import React, { useState, useEffect } from 'react';
import { ARTICLES } from '../constants';
import { Article } from '../types';
import { BookOpen, Calendar, ArrowRight, Tag, X } from 'lucide-react';

const KnowledgeColumn: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {ARTICLES.map((article) => (
          <article 
            key={article.id} 
            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-cyan-100 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full font-medium">
                {article.category}
              </span>
              <span className="flex items-center text-slate-400">
                <Calendar className="w-3 h-3 mr-1" />
                {article.date}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors line-clamp-1">
              {article.title}
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
               <div className="flex gap-2">
                  {article.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-slate-400 flex items-center bg-slate-50 px-2 py-1 rounded">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                      </span>
                  ))}
               </div>
               <button 
                 onClick={() => setSelectedArticle(article)}
                 className="text-cyan-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
               >
                 閱讀更多 <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedArticle(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 flex flex-col">
             {/* Sticky Header */}
             <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 p-4 sm:p-6 flex justify-between items-start z-20">
                <div>
                   <span className="text-cyan-600 text-sm font-bold tracking-wider mb-2 block">{selectedArticle.category}</span>
                   <h2 className="text-2xl sm:text-3xl font-bold text-cyan-900 leading-tight">
                      {selectedArticle.title}
                   </h2>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
                >
                  <X className="w-6 h-6" />
                </button>
             </div>

             {/* Body */}
             <div className="p-6 sm:p-8 text-slate-700 leading-loose text-lg whitespace-pre-line">
                {selectedArticle.content}
             </div>

             {/* Footer */}
             <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
                <div className="flex gap-2">
                   {selectedArticle.tags.map((tag, i) => (
                      <span key={i}>#{tag}</span>
                   ))}
                </div>
                <span>發布日期：{selectedArticle.date}</span>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KnowledgeColumn;
