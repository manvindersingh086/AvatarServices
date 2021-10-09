const express = require('express')
const User = require('../models/User')
const db = require('../db/mongoose')
const router = express.Router()
const session = require('express-session');

router.use(session({
    secret: 'Hiii',
    resave: false,
    saveUninitialized: true,
}))


const loginCheck = function(req,res,next)
{
    console.log(req.session.email)
    next()
}
router.use(loginCheck)

//ROUTER TO REDIRECT TO LOGIN PAGE
router.get('/login', async (req,res) => {
    res.render('login',{layout:false})
})

//ROUTER TO CHECK LOGIN CREDENTIALS WITH THE DATA IN DATABASE
router.post('/loginCheck', async (req,res) => {
    try{
        console.log(req.body.username)
        const user = await User.findOne({email : req.body.username})
        console.log(user)
        if(user == null) {
            Error = 'Invalid Login Credentials!'
            res.render('login',{layout:false,Error:Error})
        }
        else
        {
            req.session.email = user.email
            res.render('HomeLogin',{layout:false,Name:user.name})   
        }
           }
    catch (e)
    {
        console.log(e)
    }
   
})

router.get('/Logout', async (req,res) => {
    
    console.log("Inside Logout")
    req.session.email = null
    res.render('Home',{layout:false}) 

})

router.get('/', async (req,res) => {
    res.render('Home',{layout:false})
})

router.get('/CovidRegistrationPage',loginCheck,async (req,res,next) => {
    res.render('Registration',{layout:false})
})
//ROUTER FOR SIGN UP FUNCTIONALITY
router.post('/signUp',async (req,res) => {
    try
    {
          const user = new User();
          user.name = req.body.username;
          user.email = req.body.email;
          user.password = req.body.password;
         
         await user.save()
         res.send('Saved Successfully')        
    }
    catch(e)
    {
        console.log(e);
        res.send('Error')
    }
});

module.exports = router;