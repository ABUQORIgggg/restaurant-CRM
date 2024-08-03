// src/components/Users.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userListFetch } from '../redux/Slices/usersListSlice';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.usersList);

  useEffect(() => {
    dispatch(userListFetch());
  }, [dispatch]); 

  useEffect(() => {
    if (users.length > 0) {
      console.log('Users fetched:', users);
    }
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Maps through users array and renders user cards */}
          {users.map((user) => (
            <div key={user.id} className="rounded-lg shadow-md p-4shadow-md p-4 bg-blue-700 bg-opacity-50 hover:bg-blue-600 text-white font-mono transition duration-150">
                <div className='flex items-center justify-center mt-5'>
                    <img src={user.image} alt="" />
                </div>
             <div className='flex gap-2'>
                <p className='text-red-600'>Name:</p>
                <p className="text-gray-100">{user.firstName}</p>
             </div>
            <div className='flex gap-2'>
                <p className='text-red-600'>Lastname:</p>
                <p className="text-gray-100">{user.lastName}</p>
            </div>
              <p className="text-gray-100">{user.gender}</p>
              <h2 className="text-xl font-bold mb-2">{user.name}</h2>
              <p className="text-gray-100">{user.email}</p>
              <p className="text-gray-100">{user.phone}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default Users;
