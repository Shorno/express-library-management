import mongoose, { Schema, Model, Document } from 'mongoose';

interface IBook {
    title: string;
    author: string;
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
}

interface IBookMethods {
    borrowCopies(quantity: number): this;
}

interface IBookModel extends Model<IBook, {}, IBookMethods> {}

type BookDocument = Document<unknown, {}, IBook> & IBook & IBookMethods;

const BooksSchema = new Schema<IBook, IBookModel, IBookMethods>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

BooksSchema.pre('save', function (next) {
    this.available = this.copies > 0;
    next();
});

BooksSchema.methods.borrowCopies = function(quantity: number) {
    if (this.copies < quantity) {
        throw new Error(`Not enough copies. Only ${this.copies} available`);
    }

    this.copies -= quantity;
    this.available = this.copies > 0;
    return this;
};

export const Book = mongoose.model<IBook, IBookModel>('Book', BooksSchema);

export type { IBook, IBookMethods, BookDocument };