import React, {useState} from 'react'

import axios from 'axios'
import apis from '../../config/apis'
import { ImUser } from "react-icons/im";
import { BsLockFill } from "react-icons/bs";


import signup_picture from '../../img/user.jpg'
import { errorToast, successToast } from '../../helpers/toastify';


/// react-simple-typewriter

const Signup = () => {

 const [user, setUser]  = useState({
           email: "",
           password: ""
 })
 
   const signupHandler = async(e) => {
        e.preventDefault();  
        const {data} = await axios.post(`${apis.auth}/pre-signup`, user)
        const {error, message} = data
        if(error){
               errorToast(error)    
        }
        if(message){
              successToast(message)
        }

   }
   
   const changeHandler = (e) => {
    const name = e.target.name 
    const value = e.target.value 

       setUser({  ...user, [name]:value  })
  

   }       


  return (
       <div>
             <div className='bg-orange-400 text-white text-center p-2 font-bold text-2xl mt-2'>
      Signup
    </div>


               <div className="bg-white rounded-lg w-[550px] p-12 hover:scale-110 transition duration-700 hover:bg-gray-200 mx-auto mt-36 shadow-xl shadow-slate-500 hover:shadow-2xl">
                
                 <img src={signup_picture} alt="" className='mx-auto rounded-md w-48 h-48 ' />


              <div className="mt-9">


                 <form  onSubmit={signupHandler} >

                    
                         <div className="bg-slate-700 hover:bg-slate-600 px-2 rounded-lg py-8 w-full text-white mb-3">
                          <ImUser className='inline w-10 h-10  text-white mt-[-15px] ' />
                          <input
                                value={user.email}
                                name="email"
                                onChange={changeHandler}
                                placeholder='Enter your email' 
                                className='bg-transparent ml-4 text-3xl mt-[-15px]focus:outline-none border-none'
                           
                          
                          />
                 </div>

                 
                         <div className="bg-slate-700 hover:bg-slate-600 px-2 rounded-lg py-8 w-full text-white  mb-3">
                          <BsLockFill className='inline w-10 h-10  text-white ' />
                          <input
                                value={user.password}
                                name="password"
                                type="password"
                                onChange={changeHandler}
                                placeholder='Enter your password' 
                                className='bg-transparent ml-4 text-3xl outline-none focus:outline-none  '
                           
                          
                          />
                 </div>


                  <button className='bg-orange-500 mt-6 rounded-lg w-full py-8
                    text-3xl font-bold text-white font-mono italic hover:bg-rose-500
                  
                  '   >Signup</button>



                 </form>



              </div>
                  

               </div>


       </div>
  )
}

export default Signup
