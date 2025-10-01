'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown,
  ChevronRight,
  Calendar,
  Inbox,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Check
} from 'lucide-react';

// Types
interface ListItem {
  id: number;
  title: string;
  userID: number;
  userEmail: string;
  color?: string;
  taskCount?: number;
}

const TickTickSidebar = () => {
  const [activeItem, setActiveItem] = useState('inbox');
  const [lists, setLists] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLists, setShowLists] = useState(true);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [editingListId, setEditingListId] = useState<number | null>(null);
  const [editListTitle, setEditListTitle] = useState('');

  // Fetch lists from backend
  const fetchLists = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/getalllists', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: ListItem[] = await response.json();
      setLists(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lists');
      console.error('Error fetching lists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Create list
  const handleCreateList = async () => {
    if (!newListTitle.trim()) return;
    try {
      const response = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newListTitle }),
      });
      if (response.ok) {
        setNewListTitle('');
        setIsCreatingList(false);
        fetchLists();
      }
    } catch (err) {
      console.error('Error creating list:', err);
    }
  };

  // Edit list
  const handleEditList = async (id: number) => {
    if (!editListTitle.trim()) return;
    try {
      const response = await fetch(`/api/lists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editListTitle }),
      });
      if (response.ok) {
        setEditingListId(null);
        setEditListTitle('');
        fetchLists();
      }
    } catch (err) {
      console.error('Error editing list:', err);
    }
  };

  // Delete list
  const handleDeleteList = async (id: number) => {
    if (!confirm('Are you sure you want to delete this list?')) return;
    try {
      const response = await fetch(`/api/lists/${id}`, { method: 'DELETE' });
      if (response.ok) fetchLists();
    } catch (err) {
      console.error('Error deleting list:', err);
    }
  };

  const defaultMenuItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 0 },
    { id: 'today', label: 'Today', icon: Calendar, count: 1 },
    { id: 'next7days', label: 'Next 7 Days', icon: Calendar, count: 1 },
  ];

  const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">User</div>
            <div className="text-xs text-gray-500">user@email.com</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Default Items */}
        <div className="px-2 space-y-1">
          {defaultMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className="text-xs text-gray-500">{item.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Lists Section */}
        <div className="mt-4">
          <div className="px-2">
            <button
              onClick={() => setShowLists(!showLists)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                {showLists ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span className="font-medium">Lists</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreatingList(true);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Plus size={14} />
              </button>
            </button>
          </div>

          {/* Lists */}
          {showLists && (
            <div className="mt-1 px-2 space-y-1">
              {loading ? (
                <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
              ) : error ? (
                <div className="px-3 py-2 text-sm text-red-500">Error loading lists</div>
              ) : (
                <>
                  {lists.map((list) => {
                    const isActive = activeItem === `list-${list.id}`;
                    const isEditing = editingListId === list.id;
                    return (
                      <div key={list.id} className="group relative">
                        {isEditing ? (
                          <div className="flex items-center space-x-1 px-3 py-2">
                            <input
                              type="text"
                              value={editListTitle}
                              onChange={(e) => setEditListTitle(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') handleEditList(list.id);
                              }}
                              className="flex-1 text-sm border border-blue-500 rounded px-2 py-1 focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleEditList(list.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Check size={14} className="text-green-600" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingListId(null);
                                setEditListTitle('');
                              }}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <X size={14} className="text-red-600" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setActiveItem(`list-${list.id}`)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-gray-100 text-gray-900 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: list.color || getRandomColor() }}
                              />
                              <span className="truncate">{list.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {list.taskCount && list.taskCount > 0 && (
                                <span className="text-xs text-gray-500">{list.taskCount}</span>
                              )}
                              <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingListId(list.id);
                                    setEditListTitle(list.title);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteList(list.id);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  <Trash2 size={12} className="text-red-600" />
                                </button>
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Create New List Input */}
                  {isCreatingList && (
                    <div className="flex items-center space-x-1 px-3 py-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <input
                        type="text"
                        placeholder="List name"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleCreateList();
                        }}
                        onBlur={() => {
                          if (!newListTitle.trim()) setIsCreatingList(false);
                        }}
                        className="flex-1 text-sm border-b border-blue-500 focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={handleCreateList}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Check size={14} className="text-green-600" />
                      </button>
                      <button
                        onClick={() => {
                          setIsCreatingList(false);
                          setNewListTitle('');
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
          ⭐ Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default TickTickSidebar;
