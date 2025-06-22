import {Router} from "express";
import {borrowedBookSummery, createBorrowBook} from "../controllers/borrowController";

const router = Router()

router.post("/", createBorrowBook)
router.get("/", borrowedBookSummery)

export default router;