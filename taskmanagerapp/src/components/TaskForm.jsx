import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!taskText.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    onAddTask(taskText.trim());
    setTaskText('');
    setError('');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="task" className="block text-sm font-medium text-gray-700">
            Add a new task
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="task"
              className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your task here"
              value={taskText}
              onChange={(e) => {
                setTaskText(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full transition-colors duration-200"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
