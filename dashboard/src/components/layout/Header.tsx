import React, { useState } from 'react';
import { Bell, User, Settings, Menu,   Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';

interface HeaderProps {
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isMobile, toggleSidebar }: HeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const displayName = user?.name 
    || user?.email?.split('@')[0] 
    || 'User';

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const handleLogout = () => {
    setShowUserMenu(false);
    dispatch(logout());
    navigate('/login');
  }


  return (
    <header className="bg-[#0f172a] h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center min-w-0">
        {isMobile && (
          <button 
            onClick={toggleSidebar} 
            className="mr-3 text-gray-300 hover:text-blue-400 focus:outline-none transition duration-150"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center min-w-0">
          <h2 className="text-base md:text-lg font-semibold text-blue-400 truncate">
            Order Management System
          </h2>
          <span className="text-blue-400 ml-2 hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      <div className="hidden md:flex mx-4 flex-1 max-w-md relative justify-center">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="relative p-2 text-gray-300 hover:text-blue-400 transition duration-150" onClick={toggleNotifications}>
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        <button className="p-2 text-gray-300 hover:text-blue-400 transition duration-150 hidden md:block">
          <Settings className="w-5 h-5" />
        </button>

        <div className="relative flex items-center">
          <span className="text-gray-300 mr-3 hidden md:block">
          {displayName}
            </span>
          <button 
            className="flex items-center cursor-pointer"
            onClick={toggleUserMenu}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white ">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-800">
              <a href="#profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Your Profile</a>
              <a href="#settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Settings</a>
              <a href="#help" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Help Center</a>
              <div className="border-t border-gray-800 my-1"></div>
              <a onClick={handleLogout} className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-800 cursor-pointer">Sign out</a>
            </div>
          )}
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-4 md:right-16 top-16 mt-2 w-72 md:w-80 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-800 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
            <h3 className="font-medium text-gray-200">Notifications</h3>
            <button className="text-xs text-blue-400 hover:text-blue-300">Mark all as read</button>
          </div>
          <div className="py-2">
            <a href="#notification1" className="block px-4 py-3 hover:bg-gray-800 border-l-4 border-blue-500">
              <p className="text-sm font-medium text-gray-200">New order #12345 received</p>
              <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
            </a>
            <a href="#notification2" className="block px-4 py-3 hover:bg-gray-800">
              <p className="text-sm text-gray-300">Order #12344 has been shipped</p>
              <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
            </a>
            <a href="#notification3" className="block px-4 py-3 hover:bg-gray-800">
              <p className="text-sm text-gray-300">Stock alert: Product XYZ is low in inventory</p>
              <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
            </a>
          </div>
          <div className="border-t border-gray-800 py-2 text-center">
            <a href="#allnotifications" className="text-sm text-blue-400 hover:text-blue-300">View all notifications</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;