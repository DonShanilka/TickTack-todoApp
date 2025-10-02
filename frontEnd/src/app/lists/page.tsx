"use client";

import { useState } from "react";
import { Plus, List } from "lucide-react";

export default function ListsPage() {
  const [lists, setLists] = useState([
    { id: 1, title: "Work", tasks: 8 },
    { id: 2, title: "Personal", tasks: 5 },
    { id: 3, title: "Shopping", tasks: 3 },
  ]);

  const handleAddList = () => {
    const newList = {
      id: lists.length + 1,
      title: `New List ${lists.length + 1}`,
      tasks: 0,
    };
    setLists([...lists, newList]);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Lists</h1>
        <button
          onClick={handleAddList}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
        >
          <Plus className="w-4 h-4" />
          Add List
        </button>
      </div>

      {/* LISTS GRID */}
      {lists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <List className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-gray-600">No lists created yet</p>
          <button
            onClick={handleAddList}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Create your first list
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <div
              key={list.id}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {list.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {list.tasks} tasks
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
