import {Router} from "express";
import {createBook, getAllBooks} from "../controllers/bookController";

const router = Router()

router.get("/", getAllBooks)
router.post("/", createBook)





export default router;