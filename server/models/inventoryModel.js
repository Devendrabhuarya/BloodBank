
const mongoose = require('mongoose');
const User = require('./userModel')
const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: true,
        enum: ['Out', 'In']
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    quantity: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    orgnization: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: function () {
            if (this.inventoryType === 'Out') {
                return true;
            } else {
                return false;
            }
        }
    },
    doner: {
        type: String,
        required: function () {
            if (this.inventoryType === 'In') {
                return true;
            } else {
                return false;
            }
        }
    },
    donerName: {
        type: String,
        required: function () {
            if (this.inventoryType === 'In') {
                return true;
            } else {
                return false;
            }
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.inventoryType === 'Out') {
                return true;
            } else {
                return false;
            }
        }
    },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }
}, {
    timestamps: true
});

module.exports = mongoose.model('inventory', inventorySchema);