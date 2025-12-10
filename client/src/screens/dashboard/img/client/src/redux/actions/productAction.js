import axios from 'axios'
import {setLoading, setProducts}  from '../slices/productSlice'
import apis from '../../config/apis'

// curied
export const fetchProducts =  () => async (dispatch) => {
     try {
             dispatch(setLoading())  //// loading start 
             const {data} = await axios.get(apis.prod)
            // const {products} = data 
             dispatch(setProducts(data))
     } catch(err){
            console.log(err.message)
     }

}
