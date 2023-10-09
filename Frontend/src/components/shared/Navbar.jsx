import React from 'react';
import PropTypes from 'prop-types';

export function Navbar({ toogle }) {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.reload();
  };

  return (
    <nav className="w-full px-3 items-center justify-between border-b-gray-600 border-b h-14 flex">
      <div className="flex items-center">
        <h1 className="text-[25px] text-base text-xl">Tarea</h1>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={toogle}
          className="border border-base p-1.5 rounded-lg text-base hover:text-white hover:bg-base transition-all duration-400 "
        >
          Crear tarea
        </button>
        <button
          type="button"
          onClick={logout}
          className="border border-base p-1.5 rounded-lg text-base hover:text-white hover:bg-base transition-all duration-400 "
        >
          Cerrar sesion
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  toogle: PropTypes.func.isRequired,
};
