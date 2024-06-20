const jwt = require('jsonwebtoken');

const accessValidation = (req, res, next) => {
    const token = req.cookies.token; // Mengambil token dari cookie

    if (!token) {
        return res.status(401).json({
            message: 'Token diperlukan'
        });
    }

    const secret = process.env.JWT_SECRET;

    try {
        const jwtDecode = jwt.verify(token, secret);

        if (typeof jwtDecode !== 'string') {
            req.userData = jwtDecode;
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();
};

module.exports = accessValidation;
