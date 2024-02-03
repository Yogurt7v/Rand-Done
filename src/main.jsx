// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPanel from './pages/adminPanel.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
)
