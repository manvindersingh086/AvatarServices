const mongoose = require('mongoose');
const slotDetailsSchema = new mongoose.Schema({
        centreName: {
            type : String,
        },
        Slot1: {
            type: String
        },
        Slot2: {
            type: String
        },
        Slot3: {
            type: String
        },
        Slot4: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        }
})

const slotDetail = mongoose.model('SlotDetails',slotDetailsSchema);
module.exports = slotDetail;