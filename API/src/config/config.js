module.exports = {
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USER || 'postgres',
        //host: process.env.DB_HOST || '192.168.7.187',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE || 'onboarding',
        password: process.env.DB_PASSWORD || 'admin',
        port: process.env.DB_PORT || '5432',
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
}