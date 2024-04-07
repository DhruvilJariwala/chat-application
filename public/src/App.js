import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from "./pages/Register";
import Login from './pages/Login';
import Chat from './pages/Chat';
import  Setavatar from './pages/Setavatar';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Chat/>}/>
      <Route path='/avatar' element={<Setavatar/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
