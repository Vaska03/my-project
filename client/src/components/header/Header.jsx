import { Link } from 'react-router-dom';
import logo from '../../assets/mybooklogo.jpg';
import { useUser } from '../../contexts/UserContext';


export default function Header() {
    const { isAuthenticated } = useUser();
    
    return (
        <header>
            <h1>My Book World</h1>
            <nav className="nav-container">
                <div className='nav-links'>
                <Link className="home" to="/">
                    <img src={logo} alt="logo" />
                    <span className="home-text">Home</span>
                </Link>
                </div>
                 <div className='nav-links'>
                <Link className="allbooks" to="/allbooks">
                    Books
                </Link>
                </div>
                

                {isAuthenticated
                ?
                (<div className="nav-user">
                    <div className="nav-links">
                    <Link className="create" to="/create">Create</Link>
                    <Link className="logout" to="/logout">Logout</Link>
                    </div>
                </div>)

                :

                (<div className="nav-guest">
                    <div className="nav-links">
                    <Link className="login" to="/login">Login</Link>
                    <Link className="register" to="/register">Register</Link>
                    </div>
                </div>)
            }

               

            </nav>
        </header>
    );
}
