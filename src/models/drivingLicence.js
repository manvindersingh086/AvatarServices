const mongoose = require('mongoose');
const drivingLicenceSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: 'Name is required!'
    },
    DateOfBirth : {
        type:Date,
        required:'Date of Birth is required!'
    },
    Email: {
        type: String,
        required: 'Email is required!'
    },
    Address: {
        type : String,
        required:'Address is required!'
    },
    Gender: {
        type: String,
        required: 'Gender is required!'
    },
    IssueDate: {
        type: Date,
        required:'Date of Issue is required!'
    },
    ExpiryDate: {
        type: Date,
        required:'Date of expiry is required!'
    },
    IdentityProof: {
        type: String,
        required: 'Identity proof is required!'
    },
    AddressProof: {
        type: String,
        required: 'Address Proof is required!'
    }

})

const driingLicence = mongoose.model('drivingLicence',drivingLicenceSchema);
module.exports = driingLicence;