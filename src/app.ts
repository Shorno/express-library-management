import express, {Application, Request, Response} from "express"
import booksRoutes from "./routes/booksRoutes"
import borrowRoute from "./routes/borrowRoute";

export const app: Application = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json("hello world")
})


app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowRoute)

