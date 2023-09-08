const router = require('express').Router();
const Inventory = require('../models/inventoryModel');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose')


router.get('/get-all-blood', authMiddleware, async (req, res) => {
    try {
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        const orgnization = new mongoose.Types.ObjectId(req.body.userId);
        const bloodGroupsData = [];
        await Promise.all(
            bloodGroups.map(async (bloodGroup) => {
                const totalIn = await Inventory.aggregate([
                    {
                        $match: {
                            orgnization,
                            inventoryType: "In",
                            bloodGroup: bloodGroup
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum: "$quantity"
                            }
                        }
                    }

                ]);

                const totalOut = await Inventory.aggregate([
                    {
                        $match: {
                            orgnization,
                            inventoryType: "Out",
                            bloodGroup: bloodGroup
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum: "$quantity"
                            }
                        }
                    }

                ]);

                const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

                bloodGroupsData.push({
                    bloodGroup,
                    totalIn: totalIn[0]?.total || 0,
                    totalOut: totalOut[0]?.total || 0,
                    available
                });
            })
        );
        return res.send({
            success: true,
            message: "successfully fetched dashboard",
            data: bloodGroupsData
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }

})

module.exports = router;