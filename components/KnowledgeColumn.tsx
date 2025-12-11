
import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../constants';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

const KnowledgeColumn: React.FC = () => {
  return (
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
          
          <Link to={`/knowledge/${article.slug}`} className="block">
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors line-clamp-1">
              {article.title}
            </h3>
          </Link>
          
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
             <Link 
               to={`/knowledge/${article.slug}`}
               className="text-cyan-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
             >
               閱讀更多 <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default KnowledgeColumn;