import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 確保 Tailwind 指令被載入

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// 直接渲染，不加任何 setTimeout 延遲
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);