import './App.css';
import { Routes,Route } from 'react-router-dom';
import Registration from './components/Registration';
import Books from './components/Books';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Registration/>} />
      <Route path='/books' element={<Books/>} />
      </Routes>
    </div>
  );
}

export default App;
