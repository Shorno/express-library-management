import {Router} from "express";
import {createBook, deleteBookById, getAllBooks, getBookById, updateBook} from "../controllers/bookController";

const router = Router()

router.get("/", getAllBooks)
router.post("/", createBook)
router.get("/:bookId", getBookById)
router.patch("/:bookId", updateBook)
router.delete("/:bookId", deleteBookById)


export default router;