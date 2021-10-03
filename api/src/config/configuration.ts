export default () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: parseInt(process.env.PORT, 10) || 8080,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  AUTH0_ISSUER_URL: process.env.AUTH0_ISSUER_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
});
