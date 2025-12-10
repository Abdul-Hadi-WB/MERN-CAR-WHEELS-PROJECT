import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './layouts/Navigation';
import Home from './screens/Home.jsx'
import About from './screens/Aboutus.jsx'
import Contact from './screens/Contactus.jsx'
import Faq from './screens/Faq.jsx'
import Category from './screens/Category.jsx'
import Login from './screens/authentication/Login.jsx'
import Signup from './screens/authentication/Signup.jsx'
import Contactus from './screens/Contactus.jsx';
import AuthProvider from './context/auth.jsx';
import Dashboard from './screens/dashboard/Dashboard.jsx';



const App = () => {
  return (
    <AuthProvider>
    <div>
      <Router>

        <Navigation />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/category' element={<Category />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>


      </Router>
    </div>
    </AuthProvider>
  )
}

export default App
