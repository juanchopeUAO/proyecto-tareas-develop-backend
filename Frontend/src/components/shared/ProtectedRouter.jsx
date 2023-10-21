import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRouter() {
  const { isAuthenticating } = useSelector((state) => state.user) || window.localStorage.getItem('user');

  useEffect(() => {
    if (!isAuthenticating) {
      <Navigate to="/login" replace />;
    }

      <Navigate to="/" replace />;
  }, [isAuthenticating]);

  return isAuthenticating ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
