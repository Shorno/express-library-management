import express, { Application, Request, Response } from 'express';
import '../src/env';
import cors from "cors"
import path from "path"
import connectDB from "../src/config/mongodb";
import booksRoutes from "../src/routes/booksRoutes";
import borrowRoute from "../src/routes/borrowRoute";
import * as fs from "node:fs";

const app: Application = express();

app.use(cors({ origin: ['https://open-library-ruddy-chi.vercel.app', 'http://localhost:5173'] }))

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    try {
        const htmlPath = path.join(__dirname, "public", "index.html")
        const htmlContent = fs.readFileSync(htmlPath, "utf8")
        res.setHeader("Content-Type", "text/html")
        res.send(htmlContent)
    } catch (error) {
        console.error("Error serving HTML file:", error)
        res.status(500).json({ error: "Could not load page" })
    }
})

app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoute);

const PORT = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

export default app;