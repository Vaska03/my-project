import bookService from "../services/bookService.js";
import userMiddleware from '../middlewares/userMiddleware.js';
import { Router } from "express";

const bookController = Router();

bookController.get("/", async (req, res) => {
    try {
        const books = await bookService.getAll(req.query);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

bookController.get("/:id", userMiddleware ,async (req, res) => {
    try {
        const book = await bookService.getOne(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

bookController.post("/", userMiddleware, async (req, res) => {
    try {
        const book = await bookService.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

bookController.put("/:id", userMiddleware, async (req, res) => {
    try {
        const book = await bookService.update(req.params.id, req.body);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

bookController.delete("/:id",userMiddleware, async (req, res) => {
    try {
        const book = await bookService.delete(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default bookController;
