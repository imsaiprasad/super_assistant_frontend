import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreView from "./Pages/PreView.jsx"
import SubmissionPage from './Pages/SubmissionPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/preview' element={<PreView />}/>
      <Route path='/submission' element={<SubmissionPage />}/>


    </Routes>

    </BrowserRouter>
    
  </React.StrictMode>,
)
