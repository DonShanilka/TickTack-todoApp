import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { text: 'All Tasks', icon: CheckSquare, path: '/alltask' },
    { text: 'Profile', icon: User, path: '/profile' },
    { text: 'Logout', icon: LogOut, path: '/logout' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[280px] min-h-screen bg-white text-black flex flex-col fixed left-0 top-0 bottom-0 shadow-md">
        <div className="h-16 flex items-center px-4 border-b">
          <h1 className="text-lg font-semibold tracking-wide text-black">
            My Task
          </h1>
        </div>

        <nav className="flex-1 pt-4 overflow-y-auto">
          <ul className="space-y-1 px-4">
            {menuItems.map(({ text, icon: Icon, path }) => {
              const isActive = location.pathname === path;

              return (
                <li key={path}>
                  <button
                    onClick={() => navigate(path)}
                    className={`w-full flex items-center px-3 py-2 rounded-sm transition-all duration-200 group relative
                      ${isActive
                        ? 'bg-orange-100 font-semibold'
                        : 'hover:bg-gray-100 hover:translate-x-1'
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-r" />
                    )}
                    <Icon
                      size={20}
                      className={`mr-3 ${isActive
                        ? 'text-orange-600'
                        : 'text-black/70 group-hover:text-black'
                      }`}
                    />
                    <span className={`${isActive
                      ? 'text-orange-600'
                      : 'text-black/70 group-hover:text-black'
                    }`}>
                      {text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[280px] overflow-y-auto p-6 bg-gray-50 min-h-screen">
        {/* Place your routed content here */}
        <h2 className="text-2xl font-bold text-gray-800">Your Page Content</h2>
      </div>
    </div>
  );
};

export default Sidebar;
