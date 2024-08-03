import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const { user } = useSelector((state) => state.userData);
    
    useEffect(() => {
        console.log("user: ", user.role)
    }, )




  return (
    <div className="drawer lg:drawer-open block w-full h-full relative bg-base-300">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button ">
                Open drawer
            </label>
        </div>

        <div className="drawer-side w-full h-adaptive">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="flex flex-col text-base-content w-full p-4 gap-4 ">
                {/* Sidebar content here */}
               {user.role === "Cashier" &&  <>
                    <Link to={'/'} className=' py-2 px-3 hover:opacity-80 rounded-lg bg-blue-700 bg-opacity-50 transition duration-300'>Dashboard</Link>
                    <Link to={'/reservation'} className=' py-2 px-3 hover:opacity-80 rounded-lg bg-blue-700 bg-opacity-50 transition duration-300'>Reservation</Link>
                    <Link to={'/menu'} className='py-2 px-3 hover:opacity-80 rounded-lg bg-blue-700 bg-opacity-50 transition duration-300'>Menu</Link>
                    <Link to={'/myorders'} className='py-2 px-3 hover:opacity-80 rounded-lg bg-blue-700 bg-opacity-50 transition duration-300'>My orders</Link>
               </>}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar