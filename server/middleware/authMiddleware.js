const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decodeData = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decodeData.usrId;
        next();
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }

}