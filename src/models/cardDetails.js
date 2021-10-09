const mongoose = require('mongoose')
const cardDetailsSchema = new mongoose.Schema({
                CardNumber: {
                    type : String,
                    required : 'Card Number is required!',
                    trim: true
                },
                ExpiryDate: {
                    type: Date,
                    required: 'Expiry Date is required!'
                },
                cvv: {
                    type: String,
                    required: 'CVV is required!',
                    trim: true
                },
                CardHolderName: {
                    type: Number,
                    required: 'Card Holder Name is required!'
                }
})

const CardDetails = mongoose.model('CardDetails',cardDetailsSchema);
module.exports = CardDetails;