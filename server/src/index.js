import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config.js';

/* Congigurations */
dotenv.config({ path: '../.env' });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Mongoose Setup */
mongoose
  .connect(config.mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(config.port, () => console.log(`Server Port: ${config.port}`));
  })
  .catch((error) => console.log(`${error} didn't connect`));
