'use client';

import { useEffect, useState } from 'react';

interface ListItem {
  id: number;
  title: string;
  userID: number;
  userEmail: string;
}

export default function ListCards() {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/getalllists');
        if (!res.ok) throw new Error('Failed to fetch lists');
        const data = await res.json();
        setLists(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLists();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  console.log('Fetching lists...', lists);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
  {lists.map((list) => (
    <div
      key={list.ID}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
    >
      {/* Header gradient strip */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2"></div>

      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{list.Title}</h2>

        {/* Action button */}
        <button className="w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition">
          View Details
        </button>
      </div>
    </div>
  ))}
</div>

  );
}
