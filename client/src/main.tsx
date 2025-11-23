
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
try {
  console.log('main.tsx: attempting render');
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  console.log('main.tsx: render succeeded');
} catch (err) {
  console.error('main.tsx: render failed', err);
  // Fallback minimal render so user sees something even if app code throws
  root.render(
    React.createElement('div', { style: { color: '#9be7ff', padding: 20, fontFamily: 'monospace' } }, 'DEBUG: React render failed — check console')
  );
}