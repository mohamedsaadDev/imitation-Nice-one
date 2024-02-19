const jwt = require('jsonwebtoken');
module.exports = async (payload)=>{
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        return token;
    } catch (error) {
        console.error("Error generating JWT:", error);
        throw new Error("Failed to generate JWT");
    }
}