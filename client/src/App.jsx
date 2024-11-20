
import { useState } from 'react'
import './App.css'
import Register from './Register/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from '../home/Home'

function App() {


  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/> 
        <Route path='/' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
