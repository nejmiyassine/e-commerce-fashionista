module.exports = {
    MongoURI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    tokenSecretKey: process.env.ACCESS_TOKEN_SECRET,
    JwtSecretKey: process.env.JWT_SECRET_KEY,

    SALT: process.env.SALT,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

    MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,

    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    BASE_URL: process.env.BASE_URL,

    ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY,
};
