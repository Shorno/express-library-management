import {app} from "../src/app";
import "../src/env"
import {connectDB} from "../src/config/mongoose";
const PORT = process.env.PORT || 8000


async function start() {
    await connectDB();
    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    });
}

start();