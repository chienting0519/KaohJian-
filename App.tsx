
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
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
          {/* Change path param from :id to :slug for SEO friendly URLs */}
          <Route path="/knowledge/:slug" element={<ArticleDetail />} />
          <Route path="/traffic" element={<TrafficGuide />} />
          <Route path="/clinics" element={<ClinicsList />} />
          {/* Catch all to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;