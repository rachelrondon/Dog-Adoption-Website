import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Show from './Pages/Show';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dogs" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
