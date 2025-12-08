import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function Details(props) {
  const { accessToken } = useUser();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const id = props._id || bookId;

  const [isDeleting, setIsDeleting] = useState(false);
  const [book, setBook] = useState(() => props._id ? { ...props } : null);
  const [loading, setLoading] = useState(!props._id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      setLoading(false);
      return;
    }
    if (!id) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

        const res = await fetch(`http://localhost:4000/books/${id}`, { headers });
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || 'Failed to load book.');
        setBook(data);
      } catch (err) {
        setError(err.message || 'Error loading book.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, accessToken, book]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    if (!accessToken) {
      alert('You must be logged in to delete a book.');
      return;
    }
    setIsDeleting(true);

    try {
      const res = await fetch(`http://localhost:4000/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to delete the book.');
      navigate('/allbooks');
    } catch (err) {
      alert(err.message || 'Error while deleting.');
      setIsDeleting(false);
    }
  };

  if (loading) return <p>Loading book...</p>;
  if (error) return (
    <section>
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={() => navigate('/allbooks')}>Back to Books</button>
    </section>
  );

  const {
    _id,
    title,
    author,
    yearPublished,
    publisher,
    genre,
    pages,
    description,
    coverImage
  } = book || {};

  return (
    <section className="book-details">
      <h1>{title}</h1>

      {coverImage && <img src={coverImage} alt={title} style={{ maxWidth: 300 }} />}

      <p><strong>Author:</strong> {author}</p>
      <p><strong>Year:</strong> {yearPublished}</p>
      <p><strong>Publisher:</strong> {publisher}</p>
      <p><strong>Genre:</strong> {Array.isArray(genre) ? genre.join(', ') : genre}</p>
      <p><strong>Pages:</strong> {pages}</p>
      <p className="description">{description}</p>

      <div>
        <button onClick={() => navigate('/allbooks')}>Back to list</button>
        <button onClick={() => navigate(`/books/${_id}/edit`)}>Edit</button>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete book'}
        </button>
      </div>
    </section>
  );
}