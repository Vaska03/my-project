import { Link } from 'react-router-dom';
import logo from '../../assets/mybooklogo.jpg';
import './Header.css';

export default function Header() {
    return (
        <header>
            <nav>
                
                {/* Home + Logo */}
                <Link className="home" to="/">
                    <img src={logo} alt="logo" />
                    <span className="home-text">Home</span>
                </Link>

              
                <Link className="books" to="/Books">
                    Book Catalog
                </Link>
               

                {/* Only for logged users 
                <div id="user">
                    <Link className="create" to="/create">Create</Link>
                    <Link className="logout" to="/logout">Logout</Link>
                </div>*/}
                

                {/* <div id="guest">
                    <Link className="login" to="/login">Login</Link>
                    <Link className="register" to="/register">Register</Link>
                </div> Only for guests */}
                
            </nav>
        </header>
    );
}
