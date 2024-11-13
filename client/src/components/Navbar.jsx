import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

function Navbar({isAuthenticated, logout}) {
  const [showLink, setShowLink] = useState(false);
  const handleLogout= ()=>{
    logout()
  }

  return (
    <nav className="bg-white dark:bg-green-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold dark:text-white">Quotes</span>
            <span className="text-2xl font-light text-green-300 dark:text-green-300">Daily</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:order-2">
          
          {!isAuthenticated ? (<Link 
            to="/login" 
            className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <User size={18} />
            <span>Login</span>
          </Link>) : (

            <div
            onClick={handleLogout}
            className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors font-medium"
            > 
      
              <User size={18} />
              <span>logout</span>

            </div>
          )}          
          <button
            onClick={() => setShowLink(prev => !prev)}
            className="p-2 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {showLink ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        <div 
          className={`${
            showLink ? 'flex' : 'hidden'
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col w-full gap-2 p-4 mt-4 md:p-0 md:mt-0 md:flex-row md:gap-8 md:items-center font-medium">
            <li>
              <Link 
                to="/" 
                className="block py-2 px-3 text-green-600 rounded-lg md:p-0 md:hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                // aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
             {isAuthenticated ? (
               <Link 
               to="/profile" 
               className="block py-2 px-3 text-gray-700 rounded-lg hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-green-600 dark:text-gray-300 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:hover:text-green-400 transition-colors"
             >
               Profile
             </Link>
             ) : ("")}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;