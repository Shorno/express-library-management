import mongoose, {Schema, Model} from 'mongoose';

interface Books {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}

const BooksSchema = new Schema<Books>({
    title : {
        type: String,
        required: true,
        trim: true
    },
    author : {
        type: String,
        required: true,
        trim: true
    },
    genre : {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    copies : {
        type: Number,
        required: true,
        min: 0
    },
    available : {
        type: Boolean,
        default: true
    }
}, {timestamps: true})


export const Book: Model<Books> = mongoose.model('Book', BooksSchema);

