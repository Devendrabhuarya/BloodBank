const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose');
const Inventory = require('../models/inventoryModel')


router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        // check if user already exist
        const ExistUser = await User.findOne({ email: req.body.email });
        if (ExistUser) {
            return res.send({
                success: false,
                message: 'User already Exist'
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        // save user
        const user = new User(req.body);
        user.save();
        return res.send({
            success: true,
            message: 'User  register in successfully',
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        // check if user already exist
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User not found'
            });
        }

        //verify password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: 'Invalid Password'
            });
        };
        if (req.body.userType !== user.userType) {
            return res.send({
                success: false,
                message: 'Invalid Type login'
            });
        }
        // create jwt token
        const token = await jwt.sign(
            { usrId: user._id },
            process.env.jwt_secret
        );
        // success fully login
        return res.send({
            success: true,
            message: 'User  log in successfully',
            data: token
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        return res.send({
            success: true,
            message: 'user fetched successfully',
            data: user
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

router.get('/get-all-doner', authMiddleware, async (req, res) => {

    try {
        const orgnization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueDonerId = await Inventory.distinct('doner', {
            orgnization
        });
        const doner = await User.find({
            _id: { $in: uniqueDonerId }
        });

        return res.send({
            success: true,
            message: 'Successfully feched',
            data: doner
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

router.get('/get-all-hospital', authMiddleware, async (req, res) => {

    try {
        const orgnization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueHospitalId = await Inventory.distinct('hospital', {
            orgnization
        });
        const hospital = await User.find({
            _id: { $in: uniqueHospitalId }
        });

        return res.send({
            success: true,
            message: 'Successfully feched',
            data: hospital
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

router.get('/get-orgnization-of-a-doner', authMiddleware, async (req, res) => {

    try {
        const doner = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrgnizationId = await Inventory.distinct('orgnization', {
            doner
        });
        const orgnization = await User.find({
            _id: { $in: uniqueOrgnizationId }
        });

        return res.send({
            success: true,
            message: 'Successfully feched',
            data: orgnization
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

router.get('/get-orgnization-of-a-hospital', authMiddleware, async (req, res) => {

    try {
        const hospital = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrgnizationId = await Inventory.distinct('orgnization', {
            hospital
        });
        const orgnization = await User.find({
            _id: { $in: uniqueOrgnizationId }
        });

        return res.send({
            success: true,
            message: 'Successfully feched',
            data: orgnization
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});



module.exports = router;