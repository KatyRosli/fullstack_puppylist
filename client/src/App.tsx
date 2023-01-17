import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddPuppy from './components/AddPuppy';
import Puppy from './components/Puppy';
import PuppiesList from './components/PuppiesList';


const App: React.FC = () => {
  return (
    <div>
      <nav className='navbar'>
      <h1> Cute Puppies List </h1>
      <div className='navbar-nav'>
        <li className='nav-item'>
          <Link to={'/puppies'} className='nav-link'>
            Puppy List
          </Link>
        </li>
        <li className='nav-item'>
            <Link to={'/add'} className='nav-link'>
              Add Puppy
            </Link>
        </li>
    </div>
  </nav>

  <div className='container'>
        <Routes>
          <Route path='/' element={<PuppiesList/>} />
          <Route path='/puppies' element={<PuppiesList/>} />
          <Route path='/add' element={<AddPuppy/>} />
          <Route path='/puppies/:id' element={<Puppy/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
