import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import productsRouter from './routes/products.js';
import userRoutes from './routes/users.js';
import errorHandler from './middleware/errorHandling.js'; 
import {authenticateUser,logout} from  './middleware/userAuthenticate.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


config();

const PORT = process.env.PORT || 3800;


const app = express();
app.use(cors({
  origin: " http://localhost:8081 ", 
  credentials: true
}));
app.use(express.json());
app.use ('/login',authenticateUser ,userRoutes)
app.use ('/logout',logout ,userRoutes)
app.use(errorHandler);
app.use(cookieParser());
app.use(express.static('public'));
app.use('/products', productsRouter);
app.use('/users', userRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
