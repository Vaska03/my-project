import { Schema, Types, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String, 
        required: [true, 'Title is required'],

    },

    author: {
        type: String,
        required: [true, 'Author is required'],
    },

    yearPublished: {
        type: Number,
        required: [true, 'Year Published is required'],
        min: [1450, 'Year Published must be after 1450'],
        max: [2025, 'Year Published cannot be in the future'],
    },

    publisher: {
        type: String, 
        required: [true, 'Publisher is required']
    },


    genre: {
        type: [String], 
        required: [true, 'Genre is required'],
    },

    pages: {
        type: Number,
        required: [true, 'Pages is required'],
        min: [50, 'A book must have at least 50 pages'],
    },

    description: {
        type: String, 
        required: [true, 'Description is required'],
        minlength: [20, 'Description must be at least 20 charakters long'],
        maxlength: [1000, 'Description cannot exceed 1000 charakters long']
    },

    coverImage: {
        type: String,
        required: [true, 'Cover Image URL is required'],
        
    },
   


});

const Book = model('Book',bookSchema);
export default Book;