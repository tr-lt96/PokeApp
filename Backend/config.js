
module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon-team',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
    pokeApiBaseUrl: 'https://pokeapi.co/api/v2',
  };
  