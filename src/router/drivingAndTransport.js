const express = require('express')
const db = require('../db/mongoose')
const router = express.Router()
const urlencodor = express.urlencoded({extended : true})
const multer  = require('multer')
const upload = multer({ dest: './public/data/VehicleRegistration/' })
const vehicleReg = require('../models/VehicleRegistration')
const pdf= require('pdf-creator-node');
const fs = require('fs')
const path = require('path')
const renewLicence = require('../models/drivingLicence')
const demeritPoints =  require('../models/DemeritPoints')
var ObjectId = require('mongodb').ObjectID
const date = require('date-and-time')
const cardDtls = require('../models/cardDetails')

router.get('/DrivingAndTransportHome', async (req, res) => {
    res.render('DrivingAndTransportHome', {layout:false})
})

router.get('/vehicleReg', async (req, res) => {
    res.render('vehicleRegistration', {layout:false})
})

router.get('/drivingLicenceHome', async (req, res) => {
    res.render('drivingLicenceHome', {layout:false})
})

router.get('/updatePersonalDetailsDriving', async (req,res) => {
    res.render('updatePersonalDetails', {layout:false})
})

router.get('/checkDemeritPoints', async (req,res) => {
    res.render('checkDemeritPoints', {layout:false})
})

router.post('/demeritPointsDisplay', async (req,res) => {

    const dlNumber =  req.body.dlNumber
    const demeritPointDtls = await demeritPoints.find({DrivingLicenceNumber:dlNumber}).lean()

    res.render('demeritPointsDisplay',{layout:false,dmpoints:demeritPointDtls})
})

router.post('/updateDrivingLicence', async (req,res) => {

    try
    {
        const name = req.body.Name
        const rnwLicence = await renewLicence.find({_id:ObjectId(req.body.Name)}).lean()

       // console.log(rnwLicence)
      //  console.log(rnwLicence.DateOfBirth)
      //  const value = date.format(rnwLicence.IssueDate,'YYYY/MM/DD');
       // console.log(value)

        res.render('updatePersonalDetailsPage',{layout:false,licDetails:rnwLicence})

    }
    catch(e) 
    {
        console.log(e)
    }

})

router.post('/updateDetailsConfirmation', upload.array('Details'), async (req,res)=> {

    const drivingL = new renewLicence()
    drivingL.Name = req.body.Name
    drivingL.Email = req.body.email
    drivingL.Address = req.body.address
    drivingL.IdentityProof = req.files[1].filename
    drivingL.AddressProof =  req.files[0].filename

    const licenceNumber = req.body.dNumber
    await renewLicence.updateOne({_id:ObjectId(licenceNumber)},{$set:{Name:req.body.Name,Email:req.body.email,Address:req.body.address,IdentityProof:req.files[1].filename,AddressProof:req.files[0].filename}});

    console.log(drivingL)
    
    res.render('updatedDataDetailsPage', {layout:false,_id:licenceNumber,Name:req.body.Name,Email:req.body.email,Address:req.body.address})

})

router.post('/drivingLicenceType', async(req, res) => {
    const drivingLType = req.body.licence

    if( drivingLType == 'renew')
    {
        res.render('renewDrivingLicence', {layout:false})
    }
    else
    {
        res.render('freshDrivingLicence', {layout:false})
    }
})

router.post('/freshDrivingLicenceRegistration',upload.array('Proof'), async (req,res) => {
    try 
    {

    let issueDate = new Date()
    let year = issueDate.getFullYear()
    let month = issueDate.getMonth()
    let day = issueDate.getDay()

    let expiryDate = new Date(year+1,month,day)
    
    const drivingL = new renewLicence()
    drivingL.Name = req.body.Name
    drivingL.DateOfBirth = req.body.dob
    drivingL.Email = req.body.email
    drivingL.Gender = req.body.Gender
    drivingL.Address = req.body.address
    drivingL.IdentityProof = req.files[0].filename
    drivingL.AddressProof =  req.files[1].filename
    drivingL.IssueDate = issueDate
    drivingL.ExpiryDate = expiryDate

    await drivingL.save()
    
    res.render('successDrivingLicence',{layout:false, email:req.body.email})

    }
    catch(e)
    {
        console.log(e);
        res.send('Error')
    }
    
})

router.post('/downloadDrivingLicencePDF', async (req, res) => {
    const email = req.body.email
    const drivingLic = await renewLicence.find({Email:email}).lean()
    var html = fs.readFileSync(path.join(__dirname)+'/drivingLicencePDFTemplate.html', 'utf8');

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
    
     var drivingLicence = [{
        Id:drivingLic[0]._id,
        Name:drivingLic[0].Name,
        Dob:drivingLic[0].DateOfBirth,
        Gender:drivingLic[0].Gender,
        Address:drivingLic[0].Address,
        IssueDate:drivingLic[0].IssueDate,
        ExpiryDate:drivingLic[0].ExpiryDate
     }]
   
    var document = {
        html: html,
        data:{
           DL: drivingLicence
        },
        path: "./DrivingLicence.pdf"
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

router.post('/renewDrivingLicence', async (req,res) => {
    try
    {
        const name = req.body.Name
        const rnwLicence = await renewLicence.find({_id:ObjectId(req.body.Name)}).lean()
        
        res.render('renewDrivingLicenceDetails',{layout:false,licDetails:rnwLicence})
        
    }
    catch(e) 
    {
        console.log(e)
    }

 
})

router.post('/paymentPageRenewDL', async (req,res) => {
        const drivingLicenceNumber = req.body.dNumber

        res.render('paymentPageRenewDL', {layout:false,Amount:100,dlNumber:drivingLicenceNumber})

})

router.post('/RenewedDrivingLicenceDetails', async (req,res) => {
        const drivingLicenceNumber = req.query.DrivingLicenceNumber
        const cardNmbr = req.body.cardNumber
        let expiryDate = req.body.expiryDate
        const cvv = req.body.cvv
        const cardHolderName = req.body.cardHolderName

        const cardD = await cardDtls.findOne({CardNumber:cardNmbr})

        if(cardD == null)
        {
            throw "Invalid Card Number!"
        }
       
        

        const issueDate = new Date()
        expiryDate = String(issueDate.getDay())+"/"+String(issueDate.getMonth())+"/"+String(issueDate.getFullYear()+1)
        const expiryDte = new Date(expiryDate)

        console.log(issueDate)
        console.log(expiryDte)
        console.log(drivingLicenceNumber)
        await renewLicence.updateOne({_id:ObjectId(drivingLicenceNumber)},{$set:{IssueDate:issueDate,expiryDate:expiryDte}});
        
        const rnwLicence = await renewLicence.find({_id:ObjectId(drivingLicenceNumber)}).lean()

        res.render('DownloadRenewedDrivingLicence',{layout:false,DrivingLicence:rnwLicence})
})

router.post('/DownloadRenewedDL', async (req,res) => {
    const licenceNumber = req.body.licenceNumber
    const drivingLic = await renewLicence.find({_id:ObjectId(licenceNumber)}).lean()
    console.log(drivingLic)
    var html = fs.readFileSync(path.join(__dirname)+'/drivingRenewedDLTemplate.html', 'utf8');

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
    
     var drivingLicence = [{
        Id:drivingLic[0]._id,
        Name:drivingLic[0].Name,
        Dob:drivingLic[0].DateOfBirth,
        Gender:drivingLic[0].Gender,
        Address:drivingLic[0].Address,
        IssueDate:drivingLic[0].IssueDate,
        ExpiryDate:drivingLic[0].ExpiryDate
     }]
   
    var document = {
        html: html,
        data:{
           DL: drivingLicence
        },
        path: "./RenewedDrivingLicence.pdf"
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


router.get('/downloadVehicleRegCard', async (req, res) => {

    var html = fs.readFileSync(path.join(__dirname)+'/vehicleRegistrationCardTemplate.html', 'utf8');

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
    
     var vehicalReg = [{
        Id:req.query.id,
        Name:req.query.Name,
        Dob:req.query.Dob,
        Address:req.query.Address

     }]
   
    var document = {
        html: html,
        data:{
           veh: vehicalReg
        },
        path: "./VehicleRegistration.pdf"
    };

    // pdf.create(document, options)
    // .then(res => {
    //     res.render('successFulBooking',{layout : '../layouts/index'})
    // })
    // .catch(error => {
    //     res.render('successFulBooking',{layout : '../layouts/index'})
    // });

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

router.post('/vehicleRegistration',upload.array('Proof','Details'), async (req, res) => {
            try 
            {
            const vehicleRg = new vehicleReg()
            vehicleRg.Name = req.body.Name
            vehicleRg.DateofBirth = req.body.dob
            vehicleRg.Email = req.body.email
            vehicleRg.Address = req.body.address
            vehicleRg.IdentityProof = req.files[0].filename
            vehicleRg.EntitlementLetter = req.files[1].filename
            vehicleRg.AddressProof =  req.files[2].filename
            vehicleRg.Status =  "Pending"

            await vehicleRg.save()

            const VhclRg = await vehicleReg.find({email: req.body.Email}).lean()
        
            res.render('VehicleAndRegistrationStatus',{layout:false,vehicleRegs:VhclRg})

            }
            catch(e)
            {
                console.log(e);
                res.send('Error')
            }
})

module.exports = router;