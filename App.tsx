
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

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="team" element={<Team />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="checkup" element={<Checkup />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="knowledge/:id" element={<ArticleDetail />} />
          {/* Catch all to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
