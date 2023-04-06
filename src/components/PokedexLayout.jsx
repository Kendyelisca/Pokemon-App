import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import '../index.css';
const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);
  return (
    <div>
      <button
        className=" text-white p-1 bg-red-500 hover:bg-red-400 rounded fixed right-8 bottom-10 font-semibold z-50"
        onClick={removeUser}
      >
        Log out
      </button>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;
