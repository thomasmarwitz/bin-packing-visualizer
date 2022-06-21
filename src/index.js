import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BinPacking } from './routes/BinPacking';
import { BinInput } from './routes/BinInput';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="bin-packing" element={<BinPacking />} />
                <Route path="bin-input" element={<BinInput />} />
            </Routes>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);

