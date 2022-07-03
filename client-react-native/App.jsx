import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import Root from './Root';

// useContext(AuthContext) will only work in a component wrapped by the AuthProvider.

export default function App() {
  return (
    <AuthProvider> 
      <Root />
    </AuthProvider>
  );
}
