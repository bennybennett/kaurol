import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { characterRouter } from './routes/character';
import { entryRouter } from './routes/entry';
import { kaurolRouter } from './routes/kaurol';
import { locationRouter } from './routes/location';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1989;

// Connect to MongoDB

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/entries', entryRouter);
app.use('/api/characters', characterRouter);
app.use('/api/kaurol', kaurolRouter);
app.use('/api/locations', locationRouter);

// Connect to MongoDB
mongoose
  .connect(`${process.env.DB_CONN_STRING}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Check if mongoose connected
mongoose.connection.on('connected', () => {
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
