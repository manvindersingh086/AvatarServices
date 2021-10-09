const mongoose = require('mongoose')
const covidRegistrationSchema = new mongoose.Schema({
                name: {
                    type : String,
                    required : 'Name is required!',
                    trim: true
                },
                contact: {
                    type: Number,
                    required: 'Contact number is required!'
                },
                address: {
                    type: String,
                    required: 'Address is required!',
                    trim: true
                },
                zip: {
                    type: Number,
                    required: 'Zipcode is required!'
                },
                dob: {
                    type: Date,
                    required: 'Date of Birth is required!'
                },
                UIN: {
                    type: String,
                    required: 'UIN is required!'
                }
})

const CovidRegistration = mongoose.model('CovidRegistration',covidRegistrationSchema);

module.exports = CovidRegistration;