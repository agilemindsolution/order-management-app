import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
 import { useIsMobile } from '@/hooks/use-mobile';
import { BackgroundBeams } from '@/components/ui/background-beams';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <div className={`${isMobile ? 'block' : 'hidden'} md:hidden`}>
        <Header isMobile={true} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          className={`${sidebarOpen && isMobile ? 'z-50' : ''}`}
        />
        
        <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-0 md:ml-64'}`}>
          <div className="hidden md:block">
            <Header isMobile={false} toggleSidebar={toggleSidebar} />
          </div>
          <main className="p-4 md:p-6 overflow-auto relative">
            {children}
            <BackgroundBeams className="opacity-5" />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
