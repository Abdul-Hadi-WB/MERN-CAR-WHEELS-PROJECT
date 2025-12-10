import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Aboutus from './screens/Aboutus'
import Login from './screens/authentication/Login.jsx'
import Signup from './screens/authentication/Signup.jsx'
import Navigation from './layouts/Navigation'
import Home from './screens/Home'
import ActivateAccount from './screens/authentication/ActivateAccount'
import Dashboard from './screens/dashboard/Dashboard'
import {AddCarForm, UpdateCarForm} from './screens/dashboard/ManageCars'
import Cars from './screens/Cars'
import Single from './screens/Single'
import AuthProvider from './context/auth.jsx';
import UploadImage from './screens/dashboard/UploadImage.jsx'

function App() {

  return (
      <AuthProvider>
 <Router>
 <Navigation/>
<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/products/:id" element={<Single/>}/>
<Route path="/about" element={<Aboutus/>}/>
<Route path="/cars" element={<Cars/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/auth/:token" element={<ActivateAccount/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/login" element={<Login/>}/>
<Route path='/dashboard/addcars' element={<AddCarForm/>}/>
<Route path="/update/:id" element={<UpdateCarForm />} />
<Route path="/product-upload" element={<UploadImage />} />

</Routes>
 </Router>
 </AuthProvider>
  )
}

export default App
