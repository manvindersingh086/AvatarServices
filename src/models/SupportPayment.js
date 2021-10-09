const mongoose = require('mongoose');
const supportPaymentSchema = new mongoose.Schema({
    Name: {
        type : String,
        trim: true
    },
    Age: {
        type: Number,
        trim: true
    },
    Email:{
        type: String,
        unique : true,
        lowercase : true,
        trim : true
    },
    Location: {
        type: String,
        trim: true
    },
    CovidTest: {
        type: String
    },
    Details: {
        type: String
    },
    SelfIsolationFile: {
        type: String
    },
    FromDate: {
        type: Date
    },
    ToDate: {
        type: Date
    },
    EmploymentProof: {
        type: String
    },
    IdentityProof: {
        type: String
    },
    AddressProof: {
        type: String
    },
    Status: {
        type: String
    }
})

const supportPayment = mongoose.model('SupportPayment',supportPaymentSchema);
module.exports = supportPayment;