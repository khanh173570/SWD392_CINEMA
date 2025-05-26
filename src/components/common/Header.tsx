import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">
              <User className="h-6 w-6" />
            </span>
            RoleBase App
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Welcome,</span>
                  <span className="font-semibold">{user.userName}</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-500 rounded-full">
                    {user.roleName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            {user ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <span className="text-sm mr-2">Welcome,</span>
                  <span className="font-semibold">{user.userName}</span>
                </div>
                <div>
                  <span className="px-2 py-1 text-xs bg-blue-500 rounded-full">
                    {user.roleName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/login" 
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200 w-fit"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;