const jwt = require('jsonwebtoken');
const prisma = require('../../db/index.js'); // Sesuaikan dengan path ke file database Prisma Anda

const accessValidation = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Token diperlukan' });
    }

    const secret = process.env.JWT_SECRET;

    try {
        const jwtDecode = jwt.verify(token, secret);

        if (typeof jwtDecode !== 'string') {
            req.userData = jwtDecode;
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

const adminValidation = async (req, res, next) => {
    if (!req.userData) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
        where: { id: req.userData.id },
    });

    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    next();
};

module.exports = { accessValidation, adminValidation };
