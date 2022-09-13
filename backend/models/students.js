const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,  
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    standard: {
        type: String,
    },
    gender: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Student', StudentSchema);



