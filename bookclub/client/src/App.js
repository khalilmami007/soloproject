import './App.css';
import { Routes,Route } from 'react-router-dom';
import Registration from './components/Registration';
import Books from './components/Books';
import Edit from './components/Edit'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Registration/>} />
      <Route path='/books' element={<Books/>} />
      <Route path='/books/:BookId' element={<Edit/>} />


      </Routes>
    </div>
  );
}

export default App;
