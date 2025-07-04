'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { text: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { text: 'All Tasks', icon: CheckSquare, path: '/tasks' },
  { text: 'Profile', icon: User, path: '/profile' },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-[280px] min-h-screen bg-white text-black fixed left-0 top-0 bottom-0 shadow-md flex flex-col justify-between">
      {/* Top - Logo and Nav */}
      <div>
        <div className="h-16 flex items-center px-4 border-b">
          <h1 className="text-lg font-semibold text-black">Blue Beach Villa</h1>
        </div>

        <nav className="flex-1 pt-4 overflow-y-auto">
          <ul className="space-y-1 px-4">
            {menuItems.map(({ text, icon: Icon, path }) => {
              const isActive = pathname === path;

              return (
                <li key={path}>
                  <button
                    onClick={() => router.push(path)}
                    className={`w-full flex items-center px-3 py-2 rounded-sm transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-orange-100 font-semibold'
                        : 'hover:bg-gray-100 hover:translate-x-1'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-r" />
                    )}
                    <Icon
                      size={20}
                      className={`mr-3 ${
                        isActive ? 'text-orange-600' : 'text-black/70 group-hover:text-black'
                      }`}
                    />
                    <span
                      className={`${
                        isActive ? 'text-orange-600' : 'text-black/70 group-hover:text-black'
                      }`}
                    >
                      {text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom - Logout */}
      <div className="p-4 border-t">
        <button
          onClick={() => console.log('Logout clicked')}
          className="w-full flex items-center px-3 py-2 rounded-sm hover:bg-red-50 text-red-600 font-medium transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
