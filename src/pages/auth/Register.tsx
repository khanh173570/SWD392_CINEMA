import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-135px)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <RegisterForm />
    </div>
  );
};

export default Register;