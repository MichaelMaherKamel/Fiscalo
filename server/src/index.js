import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config.js';
import kpiRoutes from '../routes/kpi.js';
import productsRoutes from '../routes/product.js';
import Product from '../models/product.js';
import KPI from '../models/kpis.js';
import { kpis, products } from '../data/data.js';

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

/* Routes */
app.use('/kpi', kpiRoutes);
app.use('/product', productsRoutes);

/* Mongoose Setup */
mongoose
  .connect(config.mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(config.port, () => console.log(`Server Port: ${config.port}`));
    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase(); //Don't do it in a real production app, it's because we are testing things out so we want to drop our DB
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
  })
  .catch((error) => console.log(`${error} didn't connect`));
