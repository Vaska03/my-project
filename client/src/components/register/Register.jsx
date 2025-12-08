import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";


export default function Register() {
    const navigate = useNavigate();
    const { register } = useUser();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password || !formData.rePassword) {
            return alert('All fields are required!');
        }

        if (formData.password !== formData.rePassword) {
            return alert("Passwords do not match!");
        }

        if (formData.password.length > 100) {
            return alert('Password must be at most 100 characters long');
        }

        try {
            const response = await fetch("http://localhost:4000/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    rePassword: formData.rePassword
                })
            });

            const result = await response.json();

            if (!response.ok) {
                return alert(result?.message || "Inavalid password or email!");
            }

            register(result.user, result.token);
            navigate("/allbooks");

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <section className="register-page">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />

                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />

                <label>Confirm Password</label>
                <input type="password" name="rePassword" value={formData.rePassword} onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
        </section>
    );
}
