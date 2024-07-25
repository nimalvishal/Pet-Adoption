import './App.css';
import { Login } from './Components/LoginSignup/Login';
import React from 'react';
import { Homepage } from './Components/Homepage/Homepage';
import {Route ,Routes } from 'react-router-dom';
import {Yourpets} from './Components/addpets/Yourpets';
import { SignUp } from './Components/LoginSignup/Signup'
function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/Login' element = {<Login/>}></Route>
      <Route path='/Homepage' element = {<Homepage/>}></Route>
      <Route path='Addpets' element = {<Yourpets/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;
