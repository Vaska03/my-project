import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import AllBooks from "./components/allBooks/AllBooks";
import Create from "./components/create/Create";
import Register from './components/register/Register';
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Details from "./components/details/Details";
import Edit from "./components/edit/Edit";
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import './index.css';


function App() {
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/allbooks" element={<AllBooks />} />
         <Route path="/create" element={<Create />} />
         <Route path='/register' element={<Register />}></Route>
         <Route path='/login' element={<Login />}></Route>
         <Route path='/logout' element={<Logout />}></Route>
         <Route path="/books/:bookId" element={<Details  />}></Route>
         <Route path="/books/:bookId/edit" element={<Edit />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}
 export default App;