import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import LanguageSelector from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-end h-16 px-4 border-b bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { AppLayout };
