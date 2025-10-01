"use client";

import { CheckSquare, Calendar, ListTodo, Folder } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <header className="flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
        <button className="p-2 rounded-md border hover:bg-gray-100">☰</button>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="hidden md:inline">Dashboard</span>
          <span className="hidden md:inline">/</span>
          <span className="font-semibold">Overview</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {/* STATS CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-white rounded-xl shadow-md border">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total Tasks</p>
              <CheckSquare className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2 text-2xl font-bold">120</div>
            <p className="text-xs text-gray-500">+8% this week</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md border">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Deadlines</p>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2 text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">2 due today</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md border">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">My Lists</p>
              <ListTodo className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2 text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Work & Personal</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md border">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Projects</p>
              <Folder className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2 text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Ongoing</p>
          </div>
        </div>

        {/* RECENT TASKS + PROJECTS */}
        <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Tasks */}
          <div className="col-span-4 bg-white rounded-xl shadow-md border p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
            <div className="space-y-3">
              {["Finish API integration", "Design dashboard UI", "Team meeting prep"].map((task, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border p-3 bg-gray-50 hover:bg-gray-100"
                >
                  <p className="text-sm font-medium">{task}</p>
                  <span className="text-xs text-gray-500">Due in 2 days</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className="col-span-3 bg-white rounded-xl shadow-md border p-4">
            <h2 className="text-lg font-semibold mb-4">Active Projects</h2>
            <div className="space-y-3">
              {["ToDo App", "Green Shadow", "Consulting Website"].map((project, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border p-3 bg-gray-50 hover:bg-gray-100"
                >
                  <p className="text-sm font-medium">{project}</p>
                  <span className="text-xs text-gray-500">In Progress</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
