'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  List, 
  FolderOpen, 
  User, 
  LogOut, 
  Trash2 
} from 'lucide-react';

const SlideSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'alltask', label: 'All Tasks', icon: CheckSquare },
    { id: 'list', label: 'List', icon: List },
    { id: 'project', label: 'Project', icon: FolderOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isOpen ? 'w-64' : 'w-16'} bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col shadow-xl`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {isOpen && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center ${isOpen ? 'px-4 py-3' : 'px-3 py-3 justify-center'} rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'hover:bg-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title={!isOpen ? item.label : ''}
                  >
                    <Icon size={20} className={isOpen ? 'mr-3' : ''} />
                    {isOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Logout and Delete */}
        <div className="border-t border-slate-700 p-3 space-y-2">
          <button
            className={`w-full flex items-center ${isOpen ? 'px-4 py-3' : 'px-3 py-3 justify-center'} rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200`}
            title={!isOpen ? 'Logout' : ''}
          >
            <LogOut size={20} className={isOpen ? 'mr-3' : ''} />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
          
          <button
            className={`w-full flex items-center ${isOpen ? 'px-4 py-3' : 'px-3 py-3 justify-center'} rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200`}
            title={!isOpen ? 'Delete' : ''}
          >
            <Trash2 size={20} className={isOpen ? 'mr-3' : ''} />
            {isOpen && <span className="font-medium">Delete</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6 h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
            {activeItem.replace(/([A-Z])/g, ' $1').trim()}
          </h2>
          <div className="text-gray-600">
            <p>This is the {activeItem} content area.</p>
            <p className="mt-2">Click on different menu items to see the active state change.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideSidebar;