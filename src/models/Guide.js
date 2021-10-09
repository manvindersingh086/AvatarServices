const mongoose = require('mongoose');
const guideDetailsSchema = new mongoose.Schema({
        Name: {
            type : String,
        },
        Age: {
            type: String
        },
        Description: {
            type: String
        },
        Fee: {
            type: String
        },
        City: {
            type:String
        },
        Language:{
            type:String
        }
})

const guideDetail = mongoose.model('GuideDetails',guideDetailsSchema);
module.exports = guideDetail;