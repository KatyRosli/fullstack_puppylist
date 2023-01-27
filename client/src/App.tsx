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
      <h1 className='navbar__header'> Cute Puppies List </h1>
      <div>
        <li className='navbar__item'>
          <Link to={'/puppies'} className='navbar__link'>
            Puppy List
          </Link>
        </li>
        <li className='navbar__item'>
            <Link to={'/add'} className='navbar__link'>
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
