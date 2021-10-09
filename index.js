const express =  require('express')
const expHandlebars = require('express-handlebars')
const userRouter = require('./src/router/user');
const User = require('./src/models/User')
const covidReg = require('./src/router/covid')
const tourism = require('./src/router/tourism')
const payment = require('./src/router/payment')
const drivingAndTransport = require('./src/router/drivingAndTransport')
const http = require('http')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser');
const server = http.createServer(app)
const port = 3000
const session = require('express-session');
const { appendFileSync } = require('fs');
app.use(cookieParser()); 

//Setting path for hbs and css files
app.set('views',path.join(__dirname,'\\views'))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Using hbs engine
app.engine('.hbs', expHandlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(userRouter);
app.use(covidReg);
app.use(drivingAndTransport);
app.use(tourism)
app.use(payment)


server.listen(port,() => {
    console.log("App listening on port ${port}")
})