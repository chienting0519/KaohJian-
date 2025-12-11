import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CLINIC_INFO } from '../constants';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string; // 新增圖片支援，讓 Line 分享更漂亮
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "高雄小港區專業腎臟內科診所，提供高品質血液透析、高血壓治療、糖尿病管理與免費成人健檢服務。",
  keywords = "高健診所,高雄洗腎,小港洗腎,腎臟科,蛋白尿,糖尿病,高血壓", // 預設關鍵字
  image = "https://khjclinic.com/logo.webp"
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. 設定標題 (Title)
    const finalTitle = title.includes(CLINIC_INFO.name) 
      ? title 
      : `${title} | ${CLINIC_INFO.name}`;
    document.title = finalTitle;

    // 2. 建立 Canonical Tag (標準網址) - ★★★ 這是 SEO 權重集中的關鍵 ★★★
    // 移除 URL 末端的斜線以保持一致性
    const canonicalUrl = `https://khjclinic.com${location.pathname === '/' ? '' : location.pathname}`;
    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 3. Meta Tags 更新助手
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 基本 Meta
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('robots', 'index, follow'); // 明確告訴 Google 可以索引

    // Open Graph (FB, Line 預覽)
    updateMeta('og:title', finalTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', canonicalUrl, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:site_name', CLINIC_INFO.name, 'property');
    updateMeta('og:locale', 'zh_TW', 'property');

  }, [title, description, keywords, image, location.pathname]);

  return null;
};

export default SEO;