// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import AddTaskModal from '@/components/AddTaskModal';

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const handleSaveTask = (task: { description: string; date: string }) => {
    console.log('New Task:', task);
    // Here you can POST to your backend API
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Task
        </button>
      </div>

      <AddTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTask}
      />

      {/* Add content like task lists here */}
    </div>
  );
}
