import './App.css'
import { useSelector } from 'react-redux'
import Landing from './components/Landing/Landing'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import Home from './components/Home/Home'


function App() {
  const [access, setAccess] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    !access && navigate('/')
  }, [access])

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing 
        login={() => setAccess(true)}
        logout={() => setAccess(false)}
        />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/home/myGames' element={<Home/>} />
        <Route path='/home/apiGames' element={<Home/>} />
        <Route path='/home/allGames' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
