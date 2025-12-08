import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useEffect } from 'react';

export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useUser();

    useEffect(() => {
        Promise.resolve()
            .then(() => {
                logout();
            })
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert('There was an error loggin out:' + err.message);
                navigate('/');
            });
    }, [logout, navigate]);

    return null;


}