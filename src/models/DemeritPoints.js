const mongoose = require('mongoose');
const demeritPointsSchema = new mongoose.Schema({
    DrivingLicenceNumber: {
        type: String,
        required: 'Name is required!'
    },
    DateOfBirth : {
        type:Date,
        required:'Date of Birth is required!'
    },
    ExpiryDate: {
        type: Date,
        required:'Date of expiry is required!'
    },
    DemeritPoints: {
        type:Number,
        required: 'Demerit points required!'
    }
})

const demeritPoints = mongoose.model('demeritPoints',demeritPointsSchema);
module.exports = demeritPoints;