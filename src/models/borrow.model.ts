import mongoose, {Schema, Types} from "mongoose"

interface Borrowed {
    book: Types.ObjectId
    quantity: number
    dueDate: Date
}


const BorrowedSchema = new Schema<Borrowed>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "You must borrow at least one book."]
    },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value: Date) {
                return value instanceof Date && !isNaN(value.getTime()) && value > new Date();
            },
            message: "Due date must be a valid date in the future."
        }
    }
}, {timestamps: true})


export const Borrowed = mongoose.model<Borrowed>("Borrow", BorrowedSchema)