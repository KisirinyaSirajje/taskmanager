import React from 'react';
import { formatDate, timeAgo } from '../../utils/timeUtils';

function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className="p-4 flex flex-col transition-all duration-300 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
          />
          <span 
            className={`ml-3 text-gray-800 ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.text}
          </span>
        </div>
        <button
          onClick={() => onRemove(task.id)}
          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Time information */}
      <div className="mt-1 ml-7 text-xs text-gray-500">
        <div>Created: {formatDate(task.createdAt)} ({timeAgo(task.createdAt)})</div>
        {task.completed && task.completedAt && (
          <div>Completed: {formatDate(task.completedAt)} ({timeAgo(task.completedAt)})</div>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
