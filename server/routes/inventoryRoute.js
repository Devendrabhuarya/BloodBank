const router = require('express').Router();
const Inventory = require('../models/inventoryModel');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const { required } = require('nodemon/lib/config');
const mongoose = require('mongoose')

router.post('/add', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'Invalid Email'
            });
        };
        if (user.userType === 'hospital' && req.body.inventoryType !== 'Out') {
            throw new Error('hospital does not register as doner');
        }
        if (user.userType === 'doner' && req.body.inventoryType !== 'In') {
            throw new Error('doner does not register as hospital');
        };
        if (user.userType === 'doner') {
            req.body.donerName = user.name;
            req.body.doner = user._id;
        } else {

            //check inventory is available
            const requestedGroup = req.body.bloodGroup;
            const requestedQuantity = req.body.quantity;
            const orgnization = new mongoose.Types.ObjectId(req.body.userId);
            const totalInOfRequestedGroup = await Inventory.aggregate([
                {
                    $match: {
                        orgnization,
                        bloodGroup: requestedGroup,
                        inventoryType: 'In'
                    }
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: '$quantity' }
                    }
                }
            ]);

            const totalIn = totalInOfRequestedGroup[0]?.total || 0;

            const totalOutOfRequestedGroup = await Inventory.aggregate([
                {
                    $match: {
                        orgnization,
                        bloodGroup: requestedGroup,
                        inventoryType: 'Out'
                    }
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: '$quantity' }
                    }
                }
            ]);

            const totalOut = totalOutOfRequestedGroup[0]?.total || 0;

            const availableQunatity = totalIn - totalOut;

            if (requestedQuantity > availableQunatity) {
                throw new Error('Requested Qunatity is not avilable, Only ' + availableQunatity + ' Ml available');
            }

            req.body.hospitalName = user.hospitalName;
            req.body.hospital = user._id;
        };
        // add inventory
        const inventory = await new Inventory(req.body);
        inventory.save();
        return res.send({
            success: true,
            message: 'success fully add'
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

router.post('/get', authMiddleware, async (req, res) => {
    try {
        const data = await Inventory.find({ orgnization: req.body.userId }).sort({ createdAt: -1 }).populate(
            'doner'
        ).populate('hospital');
        return res.send({
            success: true,
            message: 'successfully  fetched ',
            data: data
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

//get dontion for doner either hospital
router.post('/filter', authMiddleware, async (req, res) => {
    try {

        const Filter = req.body.filter;

        const data = await Inventory.find(Filter).limit(req.body.limit || 100).sort({ createdAt: -1 }).populate("orgnization");

        return res.send({
            success: true,
            message: 'successfully  fetched Table ',
            data: data
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

// router.post('/filter', authMiddleware, async (req, res) => {
//     try {

//         const Filter = req.body.filter;
//         const data = await Inventory.find(Filter).sort({ createdAt: -1 }).populate("orgnization");

//         return res.send({
//             success: true,
//             message: 'successfully  fetched Table ',
//             data: data
//         });
//     } catch (error) {
//         return res.send({
//             success: false,
//             message: error.message,
//         });
//     }
// });
module.exports = router;