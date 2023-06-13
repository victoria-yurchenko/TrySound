import logo from './logo.svg';
import './App.css';
import Arts from './components/Arts';
import AppRouter from './components/AppRouter';
import { useState } from 'react';

function App() {

  const [search, setSeacrh] = useState('');

  const handleChange = (event) => {
    setSeacrh(event.target.value);
  }

  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a href='http://localhost:3000/arts' className="navbar-brand btn btn-outline-primary" style={{ backgroundColor: "#e3f2fd" }}>List</a>
          <a href='http://localhost:3000/addart' className="navbar-brand btn btn-outline-primary" style={{ backgroundColor: "#e3f2fd" }}>Add Art</a>
          <a href='http://localhost:3000/about' className="navbar-brand btn btn-outline-primary" style={{ backgroundColor: "#e3f2fd" }}>About</a>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
              onChange={handleChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <AppRouter pattern={search} />
    </div>
  );
}

export default App;
