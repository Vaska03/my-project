import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';


export default function Login() {
    const navigate = useNavigate();
    const { login } = useUser();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return alert('All fields are required!');
        }

        try {
            const response = await fetch("http://localhost:4000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const result = await response.json();

            if (!response.ok) {

                return alert(result?.message || "Invalid email or password!");

            }


            login(result.user, result.token);
            navigate("/allbooks");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <section className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />

                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />

                <button type="submit">Login</button>
            </form>
        </section>
    );
}
