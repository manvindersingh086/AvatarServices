const mongoose = require('mongoose');
const hotelDetailsSchema = new mongoose.Schema({
        location: {
            type : String,
        },
        Name: {
            type: String
        },
        price: {
            type: String
        },
        address: {
            type: String
        },
        details: {
            type:String
        }
})

const hotelDetail = mongoose.model('HotelDetails',hotelDetailsSchema);
module.exports = hotelDetail;