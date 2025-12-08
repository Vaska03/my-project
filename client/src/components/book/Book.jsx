import { Link } from 'react-router-dom';


export default function Book({
    _id, 
    title,
    author,
    yearPublished,
    publisher,
    genre,
    pages,
    description,
    coverImage
}) {
    return (
        <div className="book">
            {coverImage && <img src={coverImage} alt={title} className="book-cover" />}
            <h2>{title}</h2>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Year:</strong> {yearPublished}</p>
            <p><strong>Publisher:</strong> {publisher}</p>
            <p><strong>Genre:</strong> {genre}</p>
            <p><strong>Pages:</strong> {pages}</p>
            <p className="description">{description}</p>
            <Link to={`/books/${_id}`} className="details-link">View Details</Link>
        </div>
    );
}