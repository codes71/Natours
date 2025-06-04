const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

// const validator = require('validator')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must not exceed 40 characters'],
      minlength: [10, 'A tour name must have 10 characters'],
      // validator:validator.isAlpha
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must not exceed 5'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, ' A Tour must has a price'] },
    priceDiscount: {
      type: Number,
      validate: {
        //Will not work in UPDATE
        validator: function (val) {
          // console.log((val*1) < this.price,this.price,val)
          return val * 1 < this.price;
        },
        message: `Discount ({VALUE}) must not be greater than original price`,
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour need description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour need an image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    slug: String,
    secreteTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User', //auto reference to the model User
      },
    ],
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });


tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews', {
  ref: 'Review', //virtual field
  foreignField: 'tour', //foreign model name
  localField: '_id', //current model name
});
//DOCUMENT Middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//EMBEDDING, update မှာလည်းဒီလိုလိုက်လုပ်ရမှာဆိုလို့ Guide တွေ DAta ‌ြောင်းရင် အကုန်လိုက်မပြောင်းတော့ဘဲ Child referencing ကိုသုံး
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises); //to capture the result of the promises
//   next();
// });

//QUERY MIDDLEWARE
// tourSchema.pre('find', function (next) {

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt ',
  });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secreteTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query take ${Date.now() - this.start} ms`);
  next();
});

// tourSchema.post('save', function (doc, next) {
//   console.log(doc,this);
//   next();
// });

//AGGRATION middleware

// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({
//     $match: {
//       secreteTour: { $ne: true },
//     },
//   });
//   // console.log(this.pipeline());
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
