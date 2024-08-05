import hotel from "../models/hotel.js";
import Room from "../models/room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted sucessfully");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const Hotel = await hotel.findById(req.params.id);
    res.status(200).json(Hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Hotels = await hotel.find({ 
        ...others, 
        cheapestPrice: { $gte: min || 1, $lte: max || 1000 },
       }).limit(4); 
      //  req.query.limit
    res.status(200).json(Hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await hotel.countDocuments({ type: "Apartment" });
    const resortCount = await hotel.countDocuments({ type: "Resort" });
    const villaCount = await hotel.countDocuments({ type: "Villa" });
    const cabinCount = await hotel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};


export const getHotelRooms = async (req,res,next)=>{
  try{
   const Hotel = await hotel.findById(req.params.id);
   const list = await Promise.all(
    Hotel.rooms.map((room)=>{
      return Room.findById(room)
    })
   )
   res.status(200).json(list)
  }
  catch(err){
    next(err)
  }
}