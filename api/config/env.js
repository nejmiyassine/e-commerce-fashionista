module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

    SALT: process.env.SALT,

    MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    BASE_URL: process.env.BASE_URL,

    ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY,
};
