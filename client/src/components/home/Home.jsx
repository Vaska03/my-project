import { useState, useEffect } from 'react';
import Book from '../book/Book.jsx';


export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:4000/books');
        const data = await res.json();
        setBooks(data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

 
  const addBook = (book) => {
    setBooks(prev => [book, ...prev]);
  };

  return (
    <section id="home-page">
      <h1>Books Catalog</h1>
      {books.length === 0 && <p>No books available</p>}
      <div className="books-grid">
        {books.map(book => <Book key={book._id} {...book} />)}
      </div>
   
      <button onClick={() => addBook({ _id: Date.now(), title: 'New Book', author: 'Author' })}>
        Add Book
      </button>
    </section>
  );
}
