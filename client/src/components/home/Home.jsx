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

 
  

  return (
    <section id="home-page">
      <h1>All Books</h1>
      {books.length === 0 && <p>No books available</p>}
      <div className="books-grid">
        {books.map(book => <Book key={book._id} {...book} />)}
      </div>
   
     
    </section>
  );
}
