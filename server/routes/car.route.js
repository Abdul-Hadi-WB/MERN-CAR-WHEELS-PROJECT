import express from 'express';
import { 
  addCars, 
  fetchCars, 
  deleteCars, 
  fetchCar, 
  updateCars,
  saveImageToDB 
} from '../controllers/cars.controller.js';


const carsRoute = express.Router();

// ✅ Create new car
carsRoute.post('/addCars', addCars);

// ✅ Get all cars
carsRoute.get('/fetchCars', fetchCars);

// ✅ Get single car by ID
carsRoute.get('/:id', fetchCar);

// ✅ Update car
carsRoute.put('/update/:id', updateCars);

// ✅ Delete car
carsRoute.delete('/delete/:id', deleteCars);

carsRoute.post('/save-image', saveImageToDB);

export default carsRoute;
