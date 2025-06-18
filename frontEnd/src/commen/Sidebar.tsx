import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  User, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onLogout?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection = 'dashboard', 
  onSectionChange,
  onLogout 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      onClick: () => onSectionChange?.('dashboard')
    },
    {
      id: 'all-tasks',
      label: 'All Tasks',
      icon: <CheckSquare className="w-5 h-5" />,
      onClick: () => onSectionChange?.('all-tasks')
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      onClick: () => onSectionChange?.('profile')
    },
  ];

  const handleNavClick = (item: NavItem) => {
    item.onClick?.();
    setIsOpen(false); // Close mobile menu after navigation
  };

  const handleLogout = () => {
    onLogout?.();
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">TodoApp</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your tasks</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                  transition-all duration-200 hover:bg-gray-50
                  ${activeSection === item.id 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
                    : 'text-gray-700 hover:text-gray-900'
                  }
                `}
              >
                <span className={activeSection === item.id ? 'text-blue-500' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Example usage component to demonstrate the sidebar
const TodoAppWithSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    console.log(`Navigating to: ${section}`);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800">Total Tasks</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800">Completed</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">18</p>
              </div>
              <div className="bg-yellow-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-800">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-2">6</p>
              </div>
            </div>
          </div>
        );
      case 'all-tasks':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">All Tasks</h2>
            <div className="space-y-4">
              {['Complete project proposal', 'Review code changes', 'Update documentation', 'Team meeting'].map((task, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5" />
                    <span className="text-gray-800">{task}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                  <p className="text-gray-600">john.doe@example.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value="John Doe" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value="john.doe@example.com" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-8">Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0 overflow-auto">
        <div className="lg:hidden h-16"></div> {/* Spacer for mobile menu button */}
        {renderContent()}
      </div>
    </div>
  );
};

export default TodoAppWithSidebar;