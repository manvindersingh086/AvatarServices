const mongoose = require('mongoose');
const vehicleRegistrationSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: 'Name is requrired!',
        trim : true
    },
    Email : {
        type: String,
        required: 'Email is required!',
        trim: true,
        unique: true
    },
    DateofBirth : {
        type: Date,
        required: 'Date of Birth is required!'
    },
    Address: {
        type: String,
        required: 'Address is required!'
    },
    IdentityProof: {
        type: String,
        required: 'Identity proof is required!'
    },
    EntitlementLetter: {
        type: String,
        required: 'Entitlement letter is required!'
    },
    AddressProof: {
        type: String,
        required: 'Address Proof is required!'
    },
    Status: {
        type: String,
        required: 'Status is required!'
    }
})

const vehicleRegistration = mongoose.model('VehicleRegistration',vehicleRegistrationSchema);

module.exports = vehicleRegistration;