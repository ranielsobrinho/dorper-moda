export default {
  mongoUrl:
    process.env.MONGO_URL ?? 'mongodb://localhost:27017/dorper-moda-api',
  port: process.env.PORT ?? 5000,
  jwtToken: process.env.JWT_TOKEN ?? 'jwtsdaSDSLKdfe512654ç'
}
