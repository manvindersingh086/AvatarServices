const express = require('express')
const db = require('../db/mongoose')
const router = express.Router()
var ObjectId = require('mongodb').ObjectID
const cardDtls = require('../models/cardDetails')
const guide = require('../models/Guide')

router.post('/guideGardDetailsCheck', async (req,res) => {
    try
    {
        const cardNmbr = req.body.cardNumber
        const expiryDate = req.body.expiryDate
        const cvv = req.body.cvv
        const cardHolderName = req.body.cardHolderName

        const guideId = req.body.guideId
        const guideDtls = await guide.find({_id:ObjectId(guideId)}).lean()
        const cardD = await cardDtls.findOne({CardNumber:cardNmbr})
        
        if(cardD == null)
        {
            throw "Invalid Card Number!"
        }
        
        console.log(guideDtls)
        res.render('DownloadGuideDetails',{layout:false,guideDls:guideDtls})
    }
    catch(e)
    {

    }
    
})


module.exports = router;