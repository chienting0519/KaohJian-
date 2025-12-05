
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ARTICLES, CLINIC_INFO } from '../constants';
import { Calendar, Tag, ArrowLeft, Phone, UserRound, Share2 } from 'lucide-react';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    return <Navigate to="/knowledge" replace />;
  }

  return (
    <article className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb / Back Button */}
        <div className="mb-8">
          <Link 
            to="/knowledge" 
            className="inline-flex items-center text-slate-500 hover:text-cyan-700 transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回衛教專欄列表
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Header */}
          <div className="bg-slate-50/50 border-b border-slate-100 p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="bg-cyan-100 text-cyan-800 px-4 py-1.5 rounded-full font-bold tracking-wide">
                {article.category}
              </span>
              <span className="flex items-center text-slate-500 font-medium">
                <Calendar className="w-4 h-4 mr-2" />
                {article.date}
              </span>
              <span className="flex items-center text-slate-500 font-medium">
                <UserRound className="w-4 h-4 mr-2" />
                高健醫療團隊
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="flex items-center text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                  <Tag className="w-3 h-3 mr-1.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12 text-lg text-slate-700 leading-loose whitespace-pre-line tracking-wide">
             {article.content}
          </div>

          {/* CTA Footer */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-cyan-50 to-white border-t border-cyan-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold text-cyan-900 mb-2">有相關的健康疑問嗎？</h4>
                <p className="text-slate-600">歡迎透過 Line 諮詢或直接來電，由專業團隊為您解答</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <a 
                  href={CLINIC_INFO.bookingLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#06c755] hover:bg-[#05b34c] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-3 min-w-[200px]"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-6 h-6" />
                  Line 諮詢/預約
                </a>
                <a 
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="bg-white hover:bg-cyan-50 text-cyan-700 border-2 border-cyan-100 hover:border-cyan-300 px-8 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-3 min-w-[200px]"
                >
                  <Phone className="w-5 h-5" />
                  撥打診所電話
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;
