import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
      <Footer />
    </div>
  );
}
 export default App;