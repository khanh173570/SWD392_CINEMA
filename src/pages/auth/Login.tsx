import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-135px)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <LoginForm />
    </div>
  );
};

export default Login;