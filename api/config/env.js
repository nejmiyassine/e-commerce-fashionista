module.exports = {
    MongoURI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    tokenSecretKey : process.env.ACCESS_TOKEN_SECRET 
    JwtSecretKey: process.env.JWT_SECRET_KEY,
    SALT: process.env.SALT,
};
