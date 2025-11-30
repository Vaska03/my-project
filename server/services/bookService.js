import Book from '../models/Book.js';

export default {
    getAll(filter = {}) {
        let query = Book.find();

        if (filter.title) {
            query = query.find({ title: { $regex: filter.title, $options: 'i' } });
        }

        if (filter.author) {
            query = query.find({ author: { $regex: filter.author, $options: 'i' } });
        }

        if (filter.yearPublished) {
            query = query.find({ yearPublished: filter.yearPublished });
        }

        if (filter.publisher) {
            query = query.find({ publisher: { $regex: filter.publisher, $options: 'i' } });
        }

        if (filter.genre) {
            query = query.find({ genre: { $in: [filter.genre] } });
        }

        if (filter.pages) {
            query = query.find({ pages: { $lte: filter.pages } });
        }

        if (filter.description) {
            query = query.find({ description: { $regex: filter.description, $options: 'i' } });
        }

        if (filter.coverImage) {
            query = query.find({ coverImage: { $regex: filter.coverImage, $options: 'i' } });
        }

        return query.exec();
    },

    getOne(bookId) {
        return Book.findById(bookId);
    },

    create(bookData) {
        return Book.create(bookData);
    },

    update(bookId, bookData) {
        return Book.findByIdAndUpdate(bookId, bookData, { new: true });
    },

    delete(bookId) {
        return Book.findByIdAndDelete(bookId);
    }
}
