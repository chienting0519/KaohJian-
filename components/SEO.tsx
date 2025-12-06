import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CLINIC_INFO } from '../constants';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "高雄小港區專業腎臟內科診所，提供高品質血液透析、高血壓治療、糖尿病管理與免費成人健檢服務。",
  keywords
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Determine the final title
    // If the provided title already includes the clinic name, use it as is.
    // Otherwise, append the clinic name for branding consistency.
    const finalTitle = title.includes(CLINIC_INFO.name) 
      ? title 
      : `${title} | ${CLINIC_INFO.name}`;

    // 2. Update Document Title
    document.title = finalTitle;

    // 3. Update Meta Tags Helper
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Description
    updateMeta('description', description);
    
    // Keywords
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Open Graph
    updateMeta('og:title', finalTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', window.location.href, 'property');

  }, [title, description, keywords, location]);

  return null;
};

export default SEO;