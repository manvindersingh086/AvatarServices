const express = require('express')
const db = require('../db/mongoose')
const router = express.Router()
const hotelDetails = require('../models/Hotel')
const guide = require('../models/Guide')
const vehicle = require('../models/Vehicle')
const pdf= require('pdf-creator-node');
const fs = require('fs')
const path = require('path')
var ObjectId = require('mongodb').ObjectID
const multer  = require('multer')
const upload = multer({ dest: './public/data/Tourism/' })
const cardDtls = require('../models/cardDetails')


router.get('/tourism', async(req,res) => {
    res.render('tourismHome', {layout:false})
})

router.get('/hotelBooking', async (req,res) => {
    res.render('hotelBooking', {layout:false})
})

router.get('/guideHire', async (req,res) => {
    res.render('guideHiring', {layout:false})
})

router.post('/guideDetails', async (req,res) => {

    const location =  req.body.location
    const languageP = req.body.languagePreference

    const guideD = await guide.find({City:location,Language:languageP}).lean()
    res.render('guideHiringDetailsPage', {layout:false,guide:guideD})
})

router.post('/guidepaymentPage', async (req,res) => {
        const amnt = req.query.Amount
        const id = req.query.id
        
        res.render('PaymentPage',{layout:false,Amount:amnt,ID:id})
})

router.post('/vehiclePayment', upload.array('Proof') ,async (req,res) => {

        const VehicleId = req.body.vehicleId
        const VehicleName = req.body.vehicleName
        const custName = req.body.custName
        const custAddress = req.body.address
        const dateOfBooking = req.body.dateOfBooking
        const dateOfReturn = req.body.dateOfReturn
        const licenceNumber = req.body.licenceNumber
        const IdentityProof = req.files[1].filename
        const licenceProof =  req.files[0].filename

        const vehicleCustData = {'id':VehicleId,'Name':VehicleName,'CustomerName':custName,
                                'CustomerAddress':custAddress,'BookingDate':dateOfBooking,
                                'returnDate':dateOfReturn,'licenceNumber':licenceNumber,
                                'p1':IdentityProof,'p2':licenceProof}

        const totalAmount = req.body.totalPayment

        res.render('PaymentPageTourismVehicle',{layout:false,Amount:totalAmount,Data:vehicleCustData})       
})

router.post('/downloadVehicleBookingDetails', async (req,res) => {
        const cardNmbr = req.body.cardNumber
        const expiryDate = req.body.expiryDate
        const cvv = req.body.cvv
        const cardHolderName = req.body.cardHolderName

        const cardD = await cardDtls.findOne({CardNumber:cardNmbr})

        if(cardD == null)
        {
            throw "Invalid Card Number!"
        }
        const dta = req.body.data
        
        res.render('DownloadVehicleBookingDetails',{layout:false,data:dta})
})

router.get('/ticketBooking', async (req,res) => {
    res.render('ticketBooking', {layout:false})
})

router.post('/DownloadGuideDetails', async (req,res) => {
       
        const guideDtls = await guide.find({_id:ObjectId(req.body.guideId)}).lean()

        console.log(guideDtls)

        var html = fs.readFileSync(path.join(__dirname)+'/guideDetailsPDF.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm"
            },
            "footer": {
                "height": "28mm",
                "contents": {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
        };
        
       
        var document = {
            html: html,
            data:{
               guide: guideDtls
            },
            path: "./Guide.pdf"
        };
    
    
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm"
            },
            "footer": {
                "height": "28mm",
                "contents": {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
        };
    
        pdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
})

router.post('/hotelDetails', async (req,res) => {
    
    const location = req.body.location
    const checkInDate = req.body.checkInDate
    const checkOutDate = req.body.checkOutDate
    const adults = req.body.adults
    const child = req.body.children
    const rooms = req.body.rooms

    const hotelData = {'checkInDate':checkInDate,'checkOutDate':checkOutDate,'Adults':adults,'Children':child,'Rooms':rooms}
    const HD = await hotelDetails.find({location:location}).lean()

    const hotelD = [checkInDate,checkOutDate,adults,child,rooms]
    res.render('hotelDetailsPage',{layout:false,hotelData:hotelD,HD:HD})

    console.log(hotelD)
})

router.post('/HotelBookingUserDetails', async (req,res) => {
    console.log(req.body.price1)
})

router.get('/vehicleBooking', async (req,res) => {
    res.render('VehicleBooking', {layout:false})
})

router.post('/vehicleDetails', async (req,res) => {
    const location = req.body.location
    const vehiclePreference = req.body.vehiclePreference

    const vehcleDtls = await vehicle.find({Location:location,VehicleType:vehiclePreference}).lean()
    
    res.render('VehicleDetailsCust', {layout:false,vehicles:vehcleDtls})
})

router.post('/vehicleBookingCustomerDetails', async (req,res) => {
    const vehicleId = req.query.vehicleId
    const fee = parseInt(req.query.fee)
    const security = parseInt(req.query.Security)

    console.log(fee+security)

    const totalFee = fee+security
    const vehcleDtls = await vehicle.find({_id:ObjectId(vehicleId)})

    res.render('vehicleCustomerDetails', {layout:false, VehicleId:vehcleDtls[0]._id,VehicleName:vehcleDtls[0].VehicleName,totalFee:totalFee})
})
module.exports = router;