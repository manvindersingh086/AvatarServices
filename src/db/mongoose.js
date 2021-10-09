const mongoose = require('mongoose')

//CONNECTING WITH DATABASE
mongoose.connect('mongodb://localhost:27017/AvatarServices', {
    useUnifiedTopology: true, useNewUrlParser: true 
});

//DISPLAYING SUCCESS MESSAGE IF CONNECTION WITH DATABASE IS SUCCESSFUL
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});