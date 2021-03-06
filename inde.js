const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi);
const express = require('express');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtprivatekey')) {
  console.error('FATAL error: jwtprivatekey is not defiend. ');
  process.exit(1);
}

mongoose.connect("mongodb://localhost/vidly", { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('connected to mongoDB...'))
  .catch(err => console.error('Could not connect', err ));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth)

const port = process.env.PORT || 5000;
app.listen (port, () => console.log(`Listening on port ${port}`));