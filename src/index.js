import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Canvas, useFrame } from '@react-three/fiber';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

