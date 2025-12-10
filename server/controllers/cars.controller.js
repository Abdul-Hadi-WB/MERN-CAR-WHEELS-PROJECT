import Cars from "../models/cars.schema.js";


const addCars = async (req, res) => {
  try {
    const { name, city, year, km, fuel, price, image } = req.body;

    // Validation
    if (!name || !city || !year || !km || !fuel || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCar = new Cars({
      name,
      city,
      year,
      km,
      fuel,
      price,
      image,
    });

    await newCar.save();
    return res.status(201).json({ message: "Car inserted successfully!", car: newCar });
  } catch (err) {
    console.error("Add Car Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const fetchCars = async (req, res) => {
  try {
    const cars = await Cars.find();
    res.status(200).json(cars);
  } catch (err) {
    console.error("Fetch Cars Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const fetchCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Cars.findById(id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    console.error("Fetch Single Car Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateCars = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await Cars.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({ message: "Car updated successfully!", car: updatedCar });
  } catch (err) {
    console.error("Update Car Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteCars = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Cars.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

   return res.json({ message: "Car deleted successfully!" });
  } catch (err) {
    console.error("Delete Car Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveImageToDB = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: "Image URL missing" });

    const newImage = new Cars({
      image, // AWS image URL
      name: "Uploaded from UploadImage.jsx",
    });

    await newImage.save();
    res.json({ success: true, message: "Image saved to DB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save image" });
  }
};


export { addCars, fetchCars, fetchCar, updateCars, deleteCars };
