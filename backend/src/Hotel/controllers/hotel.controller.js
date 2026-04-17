import Hotel from "../models/hotel.model.js";

//⭐ ADD HOTEL API (Create)
export const addHotel = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Prevent adding hotel twice
    const old = await Hotel.findOne({ ownerId });
    if (old) {
      return res.status(400).json({
        success: false,
        message: "Hotel already exists for this owner!",
      });
    }

    const {
      hotelName,
      category,
      starRating,
      description,
      tags,
      address,
      city,
      state,
      pincode,
      mapUrl,
      nearbyLandmarks,
      phone,
      email,
      website,
      contactPerson,
      arVrLink,
      imageLinks,
      coverPhoto,
    } = req.body;

    const hotel = await Hotel.create({
      ownerId,
      hotelName,
      category,
      starRating,
      description,
      tags,
      address,
      city,
      state,
      pincode,
      mapUrl,
      nearbyLandmarks,
      phone,
      email,
      website,
      contactPerson,
      arVrLink,
      imageLinks,
      coverPhoto,
    });

    res.json({ success: true, hotel });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//⭐ GET HOTEL (For Dashboard Auto Load)

export const getMyHotel = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const hotel = await Hotel.findOne({ ownerId });

    res.json({ success: true, hotel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//⭐ GET ALL HOTELS API (For Tourists)
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({}).populate('ownerId', 'name email');
    res.json({ success: true, hotels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
