const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: 'Name is requrired!',
        trim : true
    },
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
})

const User = mongoose.model('User',userSchema);

module.exports = User;