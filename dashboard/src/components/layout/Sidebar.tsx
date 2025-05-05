import React from 'react';
import { Users, Package, ShoppingCart, Home, X, BarChart, Settings, HelpCircle } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  className?: string;
}

const Sidebar = ({ isOpen, toggleSidebar, className }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/dashboard',
      active: currentPath === '/'
    },
    {
      title: 'Customers',
      icon: <Users className="w-5 h-5" />,
      path: '/dashboard/customers',
      active: currentPath.includes('/customers')
    },
    {
      title: 'Products',
      icon: <Package className="w-5 h-5" />,
      path: '/dashboard/products',
      active: currentPath.includes('/products')
    },
    {
      title: 'Orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      path: '/dashboard/orders',
      active: currentPath.includes('/orders')
    },
    {
      title: 'Analytics',
      icon: <BarChart className="w-5 h-5" />,
      path: '/dashboard/analytics',
      active: currentPath.includes('/analytics')
    }
  ];

  // For mobile, render a slide-out drawer
  if (isMobile) {
    return (
      <>
        {/* Overlay when sidebar is open on mobile */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-opacity-70 backdrop-blur-sm z-30 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile Sidebar */}
        <motion.div 
          className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 bg-gray-900 ${className || ''}`}
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center p-4 border-b border-blue-900/30">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              OMS
            </h1>
            <button 
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col h-[calc(100%-64px)]">
            <nav className="flex-1 mt-5 px-2">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                        item.active
                          ? 'bg-blue-600/20 text-blue-400 shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-blue-900/20'
                      }`}
                      onClick={isMobile ? toggleSidebar : undefined}
                    >
                      {item.icon}
                      <span className="ml-3 font-medium">{item.title}</span>
                      {item.active && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-auto"></div>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            <div className="px-4 py-4 border-t border-blue-900/30 mt-auto">
              <div className="flex items-center space-x-2 mb-4">
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-blue-900/20 transition-all w-full"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-medium">Settings</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  to="/help"
                  className="flex items-center px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-blue-900/20 transition-all w-full"
                >
                  <HelpCircle className="w-5 h-5 mr-3" />
                  <span className="font-medium">Help & Support</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  // For desktop, render a fixed sidebar
  return (
    <div className="bg-gray-900 border-r border-blue-900/30 text-white hidden md:block h-full w-64 fixed left-0 top-0 overflow-y-auto z-20">
      <div className="p-5 border-b border-blue-900/30">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          OMS
        </h1>
      </div>
      
      <div className="flex flex-col h-[calc(100%-80px)]">
        <nav className="flex-1 mt-5 px-3">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-blue-600/20 text-blue-400 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-blue-900/20'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 font-medium">{item.title}</span>
                  {item.active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-auto"></div>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="px-4 py-4 border-t border-blue-900/30 mt-auto">
          <div className="flex items-center space-x-2 mb-4">
            <Link
              to="/settings"
              className="flex items-center px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-blue-900/20 transition-all w-full"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/help"
              className="flex items-center px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-blue-900/20 transition-all w-full"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              <span className="font-medium">Help & Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
