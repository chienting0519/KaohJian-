import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ARTICLES, CLINIC_INFO } from '../constants';
import { Calendar, Tag, ArrowLeft, Phone, Share2, ArrowRight } from 'lucide-react';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find(a => a.slug === slug);
  
  // ★★★ SEO 關鍵優化：自動找出「其他」文章作為延伸閱讀 (排除目前這一篇，取前兩篇) ★★★
  // 這能大幅降低「跳出率」，讓訪客在網站停留更久
  const relatedArticles = ARTICLES.filter(a => a.slug !== slug).slice(0, 2);

  // SEO Meta & Schema Injection
  useEffect(() => {
    if (article) {
      // 1. 設定瀏覽器標題
      document.title = `${article.title} | 高健診所衛教專欄`;

      // 2. 設定 Meta Description (搜尋結果摘要)
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', article.summary);

      // 3. 設定 Open Graph (讓 Line/FB 分享時有漂亮預覽)
      const updateMeta = (prop: string, content: string) => {
        let el = document.querySelector(`meta[property="${prop}"]`);
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute('property', prop);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };
      updateMeta('og:title', article.title);
      updateMeta('og:description', article.summary);
      updateMeta('og:type', 'article');
      updateMeta('og:url', window.location.href);

      // ★★★ 4. 注入複合式 Schema: MedicalWebPage + BreadcrumbList ★★★
      // 告訴 Google 這是一篇專業醫療文章，並標示出網站路徑
      const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalWebPage",
                "headline": article.title,
                "description": article.summary,
                "datePublished": article.date.replace(/\./g, '-'),
                "author": { "@type": "MedicalOrganization", "name": CLINIC_INFO.name },
                "publisher": {
                    "@type": "MedicalOrganization",
                    "name": CLINIC_INFO.name,
                    "logo": { "@type": "ImageObject", "url": "https://khjclinic.com/logo.webp" }
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://khjclinic.com/" },
                    { "@type": "ListItem", "position": 2, "name": "衛教專欄", "item": "https://khjclinic.com/#/knowledge" },
                    { "@type": "ListItem", "position": 3, "name": article.title, "item": window.location.href }
                ]
            }
        ]
      };

      const scriptId = 'article-schema';
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaData);
    }
  }, [article]);

  // 分享功能 (優先使用手機原生分享，若不支援則複製連結)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.summary,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('文章連結已複製到剪貼簿！');
    }
  };

  if (!article) {
    return <Navigate to="/knowledge" replace />;
  }

  return (
    <article className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* 頂部導航列：返回與分享按鈕 */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/knowledge" 
            className="inline-flex items-center text-slate-500 hover:text-cyan-700 transition-colors font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            回專欄列表
          </Link>
          
          <button 
            onClick={handleShare}
            className="inline-flex items-center text-cyan-700 hover:bg-cyan-50 transition-colors font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-cyan-100 hover:shadow-md"
          >
            <Share2 className="w-4 h-4 mr-2" />
            分享文章
          </button>
        </div>

        {/* 文章主內容卡片 */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* 文章標頭 (Header) */}
          <div className="bg-slate-50/50 border-b border-slate-100 p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="bg-cyan-100 text-cyan-800 px-4 py-1.5 rounded-full font-bold tracking-wide">
                {article.category}
              </span>
              <span className="flex items-center text-slate-500 font-medium">
                <Calendar className="w-4 h-4 mr-2" />
                {article.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-8">
              {article.title}
            </h1>

            {/* 標籤 (Tags) */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="flex items-center text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                  <Tag className="w-3 h-3 mr-1.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 文章內容 (Body) */}
          <div className="p-8 md:p-12 text-lg text-slate-700 leading-loose whitespace-pre-line tracking-wide font-medium">
             {article.content}
          </div>

          {/* 底部 CTA (Call to Action) */}
          <div className="p-8 md:p-12 bg-[#f0fdf4] border-t border-lime-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold text-lime-800 mb-2">擔心腎臟健康亮紅燈？</h4>
                <p className="text-lime-700 font-medium">別讓疑問過夜，現在就免費諮詢專業團隊</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <a 
                  href={CLINIC_INFO.bookingLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#06c755] hover:bg-[#05b34c] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
                  Line 線上諮詢
                </a>
                <a 
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="bg-white text-lime-700 border-2 border-lime-200 hover:bg-lime-50 px-6 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  撥打診所電話
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ★★★ 延伸閱讀區塊 (Read Next) - 這是 SEO 秘密武器 ★★★ */}
        {relatedArticles.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-slate-800">延伸閱讀</h3>
                    <div className="h-px bg-slate-200 flex-grow"></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {relatedArticles.map((relArticle) => (
                        <Link 
                            key={relArticle.id} 
                            to={`/knowledge/${relArticle.slug}`}
                            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-cyan-200 transition-all block relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            
                            <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded mb-3 inline-block group-hover:bg-cyan-100 transition-colors">
                                {relArticle.category}
                            </span>
                            <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors line-clamp-1">
                                {relArticle.title}
                            </h4>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {relArticle.summary}
                            </p>
                            <div className="flex items-center text-cyan-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
                                閱讀文章 <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

      </div>
    </article>
  );
};

export default ArticleDetail;