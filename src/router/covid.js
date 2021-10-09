const express = require('express')
const covid = require('../models/CovidRegistration')
const vaccineRegistration = require('../models/VaccineRegistration')
const slotDetails = require('../models/SlotDetails')
const db = require('../db/mongoose')
const router = express.Router()
const urlencodor = express.urlencoded({extended : true})
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
const SupportPayment = require('../models/SupportPayment')
const testingSlotDetail = require('../models/CovidTestingCentres')

router.post('/covidRegistration',async (req,res) => {
    try
    {
        
          const covidReg = new covid();
          covidReg.name = req.body.Name;
          covidReg.contact = req.body.Contact;
          covidReg.address = req.body.Address;
          covidReg.zip = req.body.Zip;
          covidReg.dob = req.body.Date;
          covidReg.UIN = req.body.UIN;

          await covidReg.save()
          res.render('CovidHome',{layout:false})    
    }
    catch(e)
    {
        console.log(e);
        res.send('Error')
    }
});

router.get('/Vaccination', async (req,res) => {
    res.render('Vaccination',{layout:false}) 
})

router.get('/covidFAQ', async (req, res) => {
    res.render('CovidFAQs',{layout:false})
})

router.get('/supportPayment', async (req, res) => {
    res.render('supportPayment', {layout:false})
})

router.get('/covidTesting', async (req, res) => {
    res.render('covidTesting',{layout:false})
})

router.post('/covidTestingSlotDetails', async (req, res) => {
    try
    {
        const name = req.body.Name;
        const UIN = req.body.UIN
        const Age = req.body.Age
        const testinslots = await testingSlotDetail.find({city: req.body.City, state:req.body.State}).lean()
        res.render('CovidTestingSlotDetails',{layout:false,testingSlots:testinslots,name:name,UIN:UIN,Age:Age})
    }
    catch(e)
    {
        console.log(e);
        res.send('Error')
    }
})

router.post('/testingSlotConfirmation', async (req, res) => {
    const Nme = req.body.Name
    const UIN = req.body.UIN
    const Age = req.body.Age
    const slotDetail = req.body.Sslot
})

router.post('/selfIsolationDetails',upload.array('Details','selfIsolationDetails','addressProof'), async (req,res) => {
    try
    {
       
        const SupprtPayment = new SupportPayment()
        SupprtPayment.Name = req.body.Name
        SupprtPayment.Age = req.body.Age
        SupprtPayment.Email = req.body.Email
        SupprtPayment.Location = req.body.Location
        SupprtPayment.CovidTest = req.body.covidTest
        SupprtPayment.Details = req.files[0].filename
        SupprtPayment.SelfIsolationFile = req.files[1].filename
        SupprtPayment.FromDate = req.body.fromDate
        SupprtPayment.ToDate = req.body.toDate
        SupprtPayment.EmploymentProof =  req.files[2].filename
        SupprtPayment.IdentityProof = req.files[3].filename
        SupprtPayment.AddressProof = req.files[4].filename
        SupprtPayment.Status = "Pending"
        
        await SupprtPayment.save()

        const SprPaymnt = await SupportPayment.find({email: req.body.Email}).lean()
        
        res.render('supportPaymentStatus',{layout:false,sprtPymt:SprPaymnt})
        
     }
    catch(e)
    {
        console.log(e);
        res.send('Error')
    }
})

router.post('/vaccineRegistration', async (req, res) => {
    try
    {
    const VaccineRegistration = new vaccineRegistration();
    VaccineRegistration.name = req.body.Name
    VaccineRegistration.email = "Manvindersingh086@gmail.com"
    VaccineRegistration.UIN = req.body.UIN
    VaccineRegistration.Age  = req.body.Age
    VaccineRegistration.City  = req.body.City
    VaccineRegistration.State = req.body.State
    VaccineRegistration.Dose = req.body.Dose
    VaccineRegistration.Vaccine = req.body.Vaccine

    await VaccineRegistration.save()

    const slotD = new slotDetails();

    const slotDtls = await slotDetails.find({city: req.body.City, state:req.body.State}).lean()

    res.render('vaccinationSlotDetails',{layout:false,slots:slotDtls,vaccine:VaccineRegistration})
}
catch(e)
{
    console.log(e);
    res.send('Error')
}

router.post('/vaccineSlotConfirmation',urlencodor, async (req,res) => {

    v = req.query.vaccineData.split(',')

    Nme = v[1].split(':')[1].split("'")[1]
    email = v[2].split(':')[1].split("'")[1]
    UIN = v[3].split(':')[1].split("'")[1]
    Age = v[4].split(':')[1]
    City = v[5].split(':')[1].split("'")[1]
    State = v[6].split(':')[1].split("'")[1]
    Dose = v[7].split(':')[1].split("'")[1]
    Vaccine = v[8].split(':')[1].split("'")[1]
    
    res.render('vaccineConfirmDetails',{layout:false,name:Nme,email:email,UIN:UIN,Age:Age,City:City,State:State,Dose:Dose,Vaccine:Vaccine,slot:req.body.Slot})
})
   


})
module.exports = router;