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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {lists.map((list) => (
        <div
          key={list.id}
          className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">{list.ID}</h2>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">User ID:</span> {list.Title}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {list.UserEmail}
          </p>
        </div>
      ))}
    </div>
  );
}
