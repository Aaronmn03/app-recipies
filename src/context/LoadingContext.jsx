import React, { createContext, useContext, useState } from 'react';

export const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}