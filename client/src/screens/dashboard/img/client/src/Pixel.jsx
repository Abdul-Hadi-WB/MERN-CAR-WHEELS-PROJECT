import React from 'react'
import './css/custom.css';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'

const Pixel = () => {
  return (
    <div className='bg-gradient-to-l from-slate-800 via-slate-900 to-slate-700 min-h-screen '>
      <ToastContainer />
      <App />
    </div>
  )
}

export default Pixel
