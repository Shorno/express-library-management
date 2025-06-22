import {Request, Response} from "express"
import {Book} from "../models/book.model";


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
            error: error instanceof Error ? error : "Internal Server Error"
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
            error: error instanceof Error ? error : "Internal Server Error"
        })
    }
}

export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.bookId)
        if (!book) {
            res.status(404).json({
                message: "Book not found"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get book",
            error: error instanceof Error ? error : "Internal Server Error"
        })
    }
}

export const updateBook = async (req: Request, res: Response) => {

    try {

        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true
        })

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
            return
        }


        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error
        })
    }

}

export const deleteBookById = async (req: Request, res: Response) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId)

        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
            return
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}