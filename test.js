const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const Tour = require('./model/tourModel');

const app = express();
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(morgan('dev'));

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
// console.log(DB);
mongoose.connect(DB).then(() => {
  console.log('connected to database');
});

app.get('/api/v2/getTours', async (req, res) => {
  try {
    let query = Tour.find();

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    console.log(query)

    const tours = await query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: tours
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const port = 3300;
// console.log(process.env);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
