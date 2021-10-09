const mongoose = require('mongoose');
const vaccineRegistrationSchema = new mongoose.Schema({
    name : {
        type: String,
        required: 'Name is requrired!',
        trim : true
    },
    email : {
        type : String,
        required: 'email is required!',
        unique : true,
        lowercase : true,
        trim : true,
        required : true
    },
    UIN: {
        type: String,
        required: 'UIN is required!'
    },
    Age: {
        type: Number,
        required: 'Age is required'
    },
    City: {
        type: String,
        required: 'City is required'
    },
    State: {
        type: String,
        required: 'State is required'
    },
    Dose: {
        type : String,
        required : 'Dose is required'
    },
    Vaccine: {
        type: String,
        required: 'Vaccine is required'
    }  
})

const vaccineRegistration = mongoose.model('VaccineRegistration',vaccineRegistrationSchema);

module.exports = vaccineRegistration;