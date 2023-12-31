import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Single from './pages/Single';
import Add from './pages/Add';

function App() {
  

  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/products/:id' element={<Single/>}/>
            <Route exact path='/cart' element={<Cart/>}/>
            <Route exact path='/add' element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
