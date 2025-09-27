'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const menuItems = [
  { text: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { text: 'All Tasks', icon: CheckSquare, path: '/tasks' },
  { text: 'Profile', icon: User, path: '/profile' },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [projects, setProjects] = useState<string[]>(['Demo Project']);
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [inviteEmails, setInviteEmails] = useState('');

  const handleCreateProject = () => {
    if (projectName.trim()) {
      setProjects([...projects, projectName.trim()]);
      setProjectName('');
      setInviteEmails('');
      setOpen(false);
    }
  };

  const handleDeleteProject = (proj: string) => {
    setProjects(projects.filter((p) => p !== proj));
  };

  return (
    <div className="w-[280px] min-h-screen bg-white text-black fixed left-0 top-0 bottom-0 shadow-md flex flex-col justify-between">
      {/* Top - Logo and Nav */}
      <div>
        <div className="h-16 flex items-center px-4 border-b">
          <h1 className="text-lg font-semibold text-black">Todo</h1>
        </div>

        {/* Menu */}
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
                        isActive
                          ? 'text-orange-600'
                          : 'text-black/70 group-hover:text-black'
                      }`}
                    />
                    <span
                      className={`${
                        isActive
                          ? 'text-orange-600'
                          : 'text-black/70 group-hover:text-black'
                      }`}
                    >
                      {text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Projects Section */}
          <div className="mt-6 px-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">
              LISTS
            </h2>
            <ul className="space-y-1">
              {projects.map((proj, idx) => (
                <li key={idx}>
                  <div className="flex items-center justify-between group">
                    <button
                      onClick={() => router.push(`/lists/${proj}`)}
                      className="flex-1 flex items-center px-3 py-2 rounded-sm text-left hover:bg-gray-100"
                    >
                      <div className="w-6 h-6 flex items-center justify-center bg-purple-500 text-white text-xs rounded mr-3">
                        {proj.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{proj}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setOpen(true)}
              className="mt-2 w-full flex items-center px-3 py-2 text-sm text-orange-600 font-medium hover:bg-orange-50 rounded-sm"
            >
              <Plus size={16} className="mr-2" />
              Create List
            </button>
          </div>
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

      {/* Create Project Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="List Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Input
              placeholder="Invite People (comma separated emails)"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-600 text-white"
              onClick={handleCreateProject}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
