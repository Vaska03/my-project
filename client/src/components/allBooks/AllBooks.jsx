import Book from '../book/Book.jsx';
import { useEffect, useState } from 'react';

export default function AllBooks() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/books`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch books: ${res.status}`);
                }
                return res.json();
            })
            .then(result => {
                console.log('Books fetched:', result);
                setBooks(result);
            })
            .catch(err => {
                console.error('Error fetching books:', err);
                alert(err.message);
            });
    }, []);

    return (
        <section id="books-page">
            <h1>Books</h1>
            {books.length === 0 && <h3 className='No books published'>No published books yet</h3>}


            <div className='books-container'>

                {books.map(book => <Book key={book._id} {...book} />)}

            </div>


        </section>
    )
} 