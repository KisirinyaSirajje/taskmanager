import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleTask, onRemoveTask }) {
  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No tasks available. Add a task to get started!
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onRemove={onRemoveTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
