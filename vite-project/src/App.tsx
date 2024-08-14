
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NewsPage from './pages/Main/Main';
import NewsDetailPage from './components/NewsDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;