const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    // common for all
    userType: {
        type: String,
        required: true,
        enum: ['admin', 'doner', 'orgnization', 'hospital']
    },
    // only for doner or admin
    name: {
        type: String,
        required: function () {
            if (this.userType === 'doner' || this.userType == 'admin') {
                return true;
            } else {
                return false;
            }
        }
    },
    // only for hospital
    hospitalName: {
        type: String,
        required: function () {
            if (this.userType === 'hospital')
                return true;
            return false;
        }
    },
    // only for orgnization
    orgnizationName: {
        type: String,
        required: function () {
            if (this.userType === 'orgnization')
                return true;
            return false;
        }
    },
    // common for all
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    // only for org and hospital
    website: {
        type: String,
        required: function () {
            if (this.userType === 'orgnization' || this.userType === 'hospital')
                return true;
            return false;
        }
    },
    address: {
        type: String,
        required: function () {
            if (this.userType === 'orgnization' || this.userType === 'hospital')
                return true;
            return false;
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);