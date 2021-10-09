const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    VehicleName : {
        type: String,
        required: 'VehicleName is requrired!',
        trim : true
    },
    VehicleType : {
        type : String,
        required: 'Vehicle Type is required!'
    },
    Mileage: {
        type: String
    },
    Fee: {
        type: Number
    },
    AllowedDistance: {
        type: String,
        required: 'AllowedDistance is required'
    },
    InterstatePermit: {
        type: String
    },
    Insurance: {
        type:String
    },
    Security: {
        type:String,
    },
    Location: {
        type:String
    }
})

const vehicleDetails = mongoose.model('VehicleDetails',vehicleSchema);

module.exports = vehicleDetails;