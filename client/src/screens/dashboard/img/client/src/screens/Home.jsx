import React, { useEffect } from 'react'
import { fetchProducts } from '../redux/actions/productAction'

import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

    const dispatch = useDispatch();
    const {loading , products} =  useSelector(state => state.productSlice) 



    useEffect(()=>{
             dispatch(fetchProducts())
    },[])

        console.log(products && products)

  return (
    <div className='bg-orange-400 text-white text-center p-2 font-bold text-2xl mt-2'>
      Home
    </div>
  )
}

export default Home
