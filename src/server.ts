import {app} from "./app";
import "./env"
import {connectDB} from "./config/mongoose";
const PORT = process.env.PORT || 8000

console.log(process.env.PORT)

async function start() {
    await connectDB();
    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    });
}

start();