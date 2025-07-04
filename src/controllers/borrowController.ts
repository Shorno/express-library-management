import {Request, Response} from "express";
import {Borrowed} from "../models/borrow.model";
import {Book} from "../models/book.model";
import mongoose from "mongoose";


export const createBorrowBook = async (req: Request, res: Response) => {
    const {book, quantity, dueDate} = req.body;

    try {
        if (!book || !dueDate) {
            res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
            return;
        }

        const existingBook = await Book.findById(book);
        if (!existingBook) {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
            return;
        }

        if (!existingBook.available) {
            res.status(400).json({
                success: false,
                message: "No copies available"
            });
            return;
        }

        if (existingBook.copies < quantity) {
            res.status(400).json({
                success: false,
                message: `Only ${existingBook.copies} copies available`
            });
            return;
        }

        const session = await mongoose.startSession();

        const result = await session.withTransaction(async () => {
            existingBook.borrowCopies(quantity);

            await existingBook.save({session});

            const borrowRecord = await Borrowed.create([{
                book,
                quantity,
                dueDate
            }], {session});

            return Array.isArray(borrowRecord) ? borrowRecord[0] : borrowRecord;
        });

        await session.endSession();

        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: result,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error: error
        });
    }
};


export const borrowedBookSummery = async (req: Request, res: Response) => {

    try {

        const summery = await Borrowed.aggregate([


            {
                $group: {
                    _id: `$book`,
                    totalQuantity: {$sum: `$quantity`}
                }
            },

            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {$unwind: "$bookInfo"},

            {
                $project: {
                    _id: 0,
                    book: {
                        title: `$bookInfo.title`,
                        isbn: `$bookInfo.isbn`
                    },
                    totalQuantity: 1
                }
            }

        ])


        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summery
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get summery",
            error: error
        })
    }

}