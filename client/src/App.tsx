import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import AddPuppy from './components/AddPuppy';
import Puppy from './components/Puppy';
import PuppiesList from './components/PuppiesList';


const App: React.FC = () => {
  return (
    <div>
      <nav className='navbar'>
      <h1 className='navbar__header'> Puppies World </h1>
      <div className='navbar__container'>
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

  <div className='body__container'>
        <Routes>
          <Route path='/' element={<PuppiesList/>} />
          <Route path='/puppies' element={<PuppiesList/>} />
          <Route path='/add' element={<AddPuppy/>} />
          <Route path='/puppies/:id' element={<Puppy/>} />
        </Routes>
  </div>
      <footer>
        <a
          href='https://github.com/KatyRosli/fullstack_puppylist'
          target="_blank"
          rel="noopener noreferrer"
          className="github"
        >
          Open sourced on Github{" "}
        </a>
        by
        <a
          href='https://www.katyrosli.com'
          target="_blank"
          rel="nopener noreferrer"
          className="name"
        >
          {" "}
          Katy Rosli
        </a>
      </footer>
    </div>
  );
}

export default App;
