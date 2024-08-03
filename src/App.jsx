import './App.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


// import { useEffect } from 'react'

function App() {
  const {user} = useSelector(state => state.userData)

  useEffect(() => {
    console.log(user)
  }, [user])

  

  return (
    <>
      <Navbar/>
      <div className='flex'>
        <div className='w-2/12 max-h-adaptive'>
          <Sidebar/>
        </div>
        <div className='w-10/12'>
          <Outlet />
        </div>
        
      </div>
    </>
  )
}

export default App
