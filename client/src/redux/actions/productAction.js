import { setLoading, setProduct, setProducts } from "../slices/productSlice";
import axios from "axios";
import apis from "../../config/apis";

//setLoading aur setProducts reducers hain jo productSlice me defined hain.

export const fetchAllProducts = () => async(dispatch) => {
 try{
 dispatch(setLoading())   //ek action hai jo state ko loading = true kar deta hai.
 const {data} = await axios.get(`${apis.cars}/fetchCars`)
 dispatch(setProducts(data))   //ek action hai jo state me products ko update karta hai API se aaye data ke saath.
 }catch(err){
 console.log(err.message)
 }
}

export const fetchCar = (id) => async(dispatch) => { 
 try{
 dispatch(setLoading())
 const{data} = await axios.get(`${apis.cars}/${id}`)
 dispatch(setProduct(data))
 }catch(err){
console.log(err.message)
 }
}

//Axios ek HTTP client hai jo API requests bhejne ke liye use hota ha.