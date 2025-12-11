import React from 'react';
// 使用 BrowserRouter (SEO 友善模式)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// 引入頁面元件
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Schedule from './pages/Schedule';
import Checkup from './pages/Checkup';
import Knowledge from './pages/Knowledge';
import ArticleDetail from './pages/ArticleDetail';
import ClinicsList from './pages/ClinicsList';
import TrafficGuide from './pages/TrafficGuide';

const App: React.FC = () => {
  return (
    // 【關鍵修復】Router 必須包住最外層，ScrollToTop 才能正常運作
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/checkup" element={<Checkup />} />
          <Route path="/knowledge" element={<Knowledge />} />
          {/* SEO 友善網址結構 */}
          <Route path="/knowledge/:slug" element={<ArticleDetail />} />
          <Route path="/traffic" element={<TrafficGuide />} />
          <Route path="/clinics" element={<ClinicsList />} />
          
          {/* 404 處理：導回首頁 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;