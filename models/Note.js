//haha Note.js do you get it DO YOU GET IT????? Its like Node.js but t inst.. aah fuck it what am i even doing i wish i'd never been born
//
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)  //this is what thats been documented for this package
const noteSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'  //referring back to the user scheme
        },
        title:{
            type: String,
            required: true
        },
        text:{
            type: String,
            required: true
        },
        completed:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement,{
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)