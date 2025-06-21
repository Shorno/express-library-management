import {Request, Response} from "express"
import {Book} from "../models/books.model";


export const createBook = async (req: Request, res: Response) => {
    const {title, author, genre, isbn, description, copies, available} = req.body;


    if (!title || !author || !genre || !isbn || !copies) {
        res.status(400).json({
            message: "Missing required fields"
        });
        return;
    }

    try {
        const book = await Book.create({
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available
        })

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });

    } catch (error) {
        console.log("Error creating book:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: error instanceof Error ? error.message : "Internal Server Error"
        });

    }
}

export const getAllBooks = async (req: Request, res: Response) => {


    try {

        const filter = req.query.filter as string;
        const sortBy = req.query.sortBy as string || "createdAt";
        const sort = req.query.sort as string || "desc"
        const limit = parseInt(req.query.limit as string) || 10;

        const filterObject: any = {}


        if (filter) {
            filterObject.genre = filter.toUpperCase()
        }

        const sortObject: any = {}
        const sortDirection = sort === "asc" ? 1 : -1;

        if (sortBy) {
            sortObject[sortBy] = sortDirection
        }

        console.log("logging in filter:", sortObject);


        const books = await Book.find(filterObject).sort(sortObject).limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error) {
        console.error("Error getting books:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get books",
            error: error instanceof Error ? error.message : "Internal Server Error"
        })
    }
}