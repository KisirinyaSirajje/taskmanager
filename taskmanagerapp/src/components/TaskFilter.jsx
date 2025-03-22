import React from 'react';

function TaskFilter({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 mb-3">
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'all' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors duration-200`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'active' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors duration-200`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'completed' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors duration-200`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      <div className="flex justify-center space-x-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 rounded-md text-sm bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="completed">Recently Completed</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;
