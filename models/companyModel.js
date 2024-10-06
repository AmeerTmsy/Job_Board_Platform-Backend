const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
    },
    website: {
        type: String,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    logo: {
        type: String,
    }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
