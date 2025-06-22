import { connectDB } from '../src/config/mongoose';
import {app} from "../src/app";

connectDB();

export default app;
