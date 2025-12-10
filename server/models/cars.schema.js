import { Schema, model } from 'mongoose'

const carsSchema = new Schema({
  name: { type: String, require: true },
  city: { type: String, require: true },
  year: { type: String, require: true },
  km: { type: String, require: true },
  fuel: { type: String, require: true },
  price: { type: String, require: true },
  image: String,
}, { timestamps: true }) // ✅ timestamps add kar diya

const Cars = model("cars", carsSchema)
export default Cars
