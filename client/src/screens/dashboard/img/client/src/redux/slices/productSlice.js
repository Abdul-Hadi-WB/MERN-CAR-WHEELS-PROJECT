import { createSlice } from '@reduxjs/toolkit'

const initialState =  {
       products: [],
       product: null, 
       loading: false, 
       error: ""
}

const productSlice = createSlice({
   name: "products",
   initialState,
   reducers: {
            setLoading: (state) => {
              state.loading = true 
            },
            setProducts: (state, {payload}) => {
               state.loading = false
               state.products = payload
            }
   }
})


export const {setLoading, setProducts} = productSlice.actions
export default productSlice.reducer