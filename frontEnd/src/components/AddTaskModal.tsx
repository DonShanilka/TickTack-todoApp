// components/AddTaskModal.tsx
'use client';

import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { description: string; date: string }) => void;
}

export default function AddTaskModal({ isOpen, onClose, onSave }: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (description && date) {
      onSave({ description, date });
      onClose();
      setDescription('');
      setDate('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
  className="fixed inset-0 flex items-center justify-center z-50"
  style={{ backgroundColor: 'rgba(0, 0, 0, 0.70)' }} // 3% darkness
>

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Task</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Select Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
