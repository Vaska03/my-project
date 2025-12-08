import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/UserContext';


export default function Create() {
    const navigate = useNavigate();
    const { accessToken } = useUser();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        yearPublished: "",
        publisher: "",
        genre: "",
        pages: "",
        description: "",
        coverImage: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.author) {
            return alert('Title and Author are required!');
        }

        console.log("Submitting formData:", formData);


        fetch("http://localhost:4000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                       "Authorization": `Bearer ${accessToken}`},
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data?.message || 'Failed to create book');
                    });

                }

                return res.json();

            })
            .then(result => {
                console.log("Book created:", result);
                navigate("/allbooks");
            })
            .catch(err => alert(err.message));
    };

    return (
        <section className="create-page">
            <h1>Create Book</h1>

            <form onSubmit={handleSubmit} className="create-form">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>Author</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />

                <label>Year Published</label>
                <input
                    type="number"
                    name="yearPublished"
                    value={formData.yearPublished}
                    onChange={handleChange}
                />

                <label>Publisher</label>
                <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                />

                <label>Genre</label>
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />

                <label>Pages</label>
                <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label>Cover Image URL</label>
                <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                />

                <button type="submit">Create Book</button>
            </form>
        </section>
    );
}
