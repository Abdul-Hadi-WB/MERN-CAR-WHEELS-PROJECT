import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: ""
}

const productSlice = createSlice({
  name: "products",          //slice ka naam — ye Redux devtools me dikhai deta hai.
  initialState,              //wo state jo upar define ki.
  reducers: {                //functions jo state update karte hain.
    setLoading: (state) => { //Jab API se data fetch karna start hota hai, ye action dispatch hota hai.
      state.loading = true   //Ye batata hai ke “abhi loading chal rahi hai"
    },
    setProducts: (state, { payload }) => { //Jab saare products ka data mil jata hai (list form me),
      state.loading = false                //to ye reducer state me wo data daal deta hai
      state.products = payload

    },
    setProduct: (state, { payload }) => {  //Ye tab use hota hai jab sirf ek product (e.g. ek car detail) fetch karte ho.
      state.loading = false
      state.product = payload

    }

  }
})

export const { setLoading, setProducts, setProduct } = productSlice.actions
export default productSlice.reducer