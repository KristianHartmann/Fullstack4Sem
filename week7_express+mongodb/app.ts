import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express = require('express');
import morgan = require('morgan');
import logger from './utility/logger';
import carRouter from './routes/carRoute';
import mechanicRouter from './routes/mechanicRoute';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Development mode...');
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files

// Routes
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/mechanics', mechanicRouter);

export default app;
