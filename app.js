// const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const bookingController = require('./controllers/bookingController');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//GLOBAL middlewares
app.use(cors());
// app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: [
//         "'self'",
//         'https://api.mapbox.com',
//         'https://events.mapbox.com',
//         'https://js.stripe.com/basil/stripe.js',
//         'https://js.stripe.com/',
//       ],
//       connectSrc: [
//         "'self'",
//         'ws://127.0.0.1:60345',
//         'https://api.mapbox.com',
//         'https://events.mapbox.com',
//         'https://js.stripe.com/basil/stripe.js',
//         'https://js.stripe.com/',
//       ],
//       workerSrc: ["'self'", 'blob:'],
//     },
//   }),
// );

// app.use(helmet());

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit request
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout,
);

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
// app.use(
//   mongoSanitize(),
// );

// Data sanitization against XSS
// app.use(xss());

//PREvent pollution
app.use(
  // hpp(),
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);
app.use(compression());

//ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', cors(), tourRouter);
app.use('/api/v1/users', cors(), userRouter);
app.use('/api/v1/reviews', cors(), reviewRouter);
app.use('/api/v1/bookings', cors(), bookingRouter);

app.use((req, res, next) => {
  next(
    new AppError(
      `'${req.originalUrl}' with ${req.method} — this path is lost in the woods (just like in folklore).`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

module.exports = app;
