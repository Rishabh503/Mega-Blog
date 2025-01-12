import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import { Footer, Header } from './components'
import {Outlet} from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch()
  
useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    } else{
      dispatch(logout())
    }
  })
  .finally(()=>setLoading(false))
},[])

  return !loading?(
    <div className='bg-red-600 text-yellow-800'>
      <Header/>
      <h1 className="text-5xl font-bold underline">
      Hello world!
    </h1>
      <main>
        <Outlet/>
      </main>
      <Footer/>
      hii
    </div>
  ):<h1>loading</h1>
}

export default App
