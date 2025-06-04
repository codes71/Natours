const dotenv = require('dotenv');
const mongoose = require('mongoose');

// console.log(process.env)
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting downnnnn...');
  console.log(err);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
// console.log(DB);
mongoose.connect(DB).then(() => {
  console.log('connected to database');
});

console.log(process.env.NODE_ENV)
const port = process.env.PORT || 3000;
// console.log(process.env);
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//SAFETY NET TO HANDLE ALL UNHANDLED REJECTION
process.on('unhandledRejection', (err) => {
  console.log('unhandled rejection', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
// console.log(process.env);
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
