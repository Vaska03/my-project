import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function Edit() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useUser();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    yearPublished: '',
    publisher: '',
    genre: '',
    pages: '',
    description: '',
    coverImage: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

        const res = await fetch(`http://localhost:4000/books/${bookId}`, { headers });

        let data = null;
        try {
          data = await res.json();
        } catch {
          throw new Error('Invalid server response.');
        }

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to load book.');
        }

        if (!data) throw new Error('Book not found.');

        setFormData({
          title: data.title ?? '',
          author: data.author ?? '',
          yearPublished: data.yearPublished ?? '',
          publisher: data.publisher ?? '',
          genre: Array.isArray(data.genre) ? data.genre.join(', ') : (data.genre || ''),
          pages: data.pages ?? '',
          description: data.description ?? '',
          coverImage: data.coverImage ?? ''
        });

      } catch (err) {
        setError(err.message || 'Error loading book.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId, accessToken]);


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      return alert('Title and Author are required!');
    }

    if (!accessToken) {
      return alert('You must be logged in to edit a book.');
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        yearPublished: Number(formData.yearPublished),
        pages: Number(formData.pages),
        genre: formData.genre
          .split(',')
          .map(g => g.trim())
          .filter(Boolean)
      };

      const res = await fetch(`http://localhost:4000/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to update book.');
      }

      navigate('/allbooks');
    } catch (err) {
      alert(err.message || 'Error while updating.');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) return <p>Loading book...</p>;

  if (error) {
    return (
      <section>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/allbooks')}>Back to Books</button>
      </section>
    );
  }

  return (
    <section className="edit-page">
      <h1>Edit Book</h1>

      <form onSubmit={handleSubmit} className="edit-form">
        
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />

        <label htmlFor="yearPublished">Year Published</label>
        <input
          id="yearPublished"
          type="number"
          name="yearPublished"
          value={formData.yearPublished}
          onChange={handleChange}
        />

        <label htmlFor="publisher">Publisher</label>
        <input
          id="publisher"
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />

        <label htmlFor="genre">Genre (comma-separated)</label>
        <input
          id="genre"
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <label htmlFor="pages">Pages</label>
        <input
          id="pages"
          type="number"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
        />

        <label htmlFor="coverImage">Cover Image URL</label>
        <input
          id="coverImage"
          type="text"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
        />

        <div className='form-buttons'>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/allbooks')}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
