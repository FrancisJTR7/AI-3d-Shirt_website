import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <main className='app transition-all ease-in'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/canvas' element={<Canvas />} />
          <Route path='/customizer' element={<Customizer />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
