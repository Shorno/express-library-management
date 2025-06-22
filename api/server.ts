import express, { Application, Request, Response } from 'express';
import booksRoutes from "../src/routes/booksRoutes";
import borrowRoute from "../src/routes/borrowRoute";
import {connectDB} from "../src/config/mongoose";


const app: Application = express();

app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('hello world');
});

app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoute);

export default app;


