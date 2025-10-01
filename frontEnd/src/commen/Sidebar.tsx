"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Calendar, CheckSquare, List, Folder, Settings, ChevronRight } from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname(); // get current route path

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "calendar", name: "Calendar", icon: Calendar, path: "/calendar" },
    { id: "tasks", name: "My All Task", icon: CheckSquare, path: "/tasks" },
    { id: "list", name: "My List", icon: List, path: "/list" },
    { id: "project", name: "Project", icon: Folder, path: "/project" },
    { id: "settings", name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">TaskFlow</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your work</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Use pathname to show title dynamically */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {menuItems.find((item) => item.path === pathname)?.name}
          </h2>
          <p className="text-gray-600">
            Welcome to your {menuItems.find((item) => item.path === pathname)?.id} section
          </p>
        </div>
      </div>
    </div>
  );
}
