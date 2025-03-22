// import React, { useState, useEffect } from 'react';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import TaskFilter from './components/TaskFilter';

// function App() {
//   const [tasks, setTasks] = useState(() => {
//     // Load tasks from localStorage if available
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Save tasks to localStorage whenever tasks change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Fetch mock data when component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setIsLoading(true);
//         // Using JSONPlaceholder for mock data
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch tasks');
//         }
        
//         const data = await response.json();
        
//         // Transform the data to match our task structure with timestamps
//         const formattedTasks = data.map(item => ({
//           id: `mock-${item.id}`,
//           text: item.title,
//           completed: item.completed,
//           createdAt: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(), // Random time within the last week
//           completedAt: item.completed ? new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString() : null // Random time within the last day if completed
//         }));
        
//         setTasks(prevTasks => {
//           // Only add mock tasks if there are no existing tasks
//           return prevTasks.length > 0 ? prevTasks : formattedTasks;
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const addTask = (text) => {
//     const newTask = {
//       id: Date.now().toString(),
//       text,
//       completed: false,
//       createdAt: new Date().toISOString(), // Add creation timestamp
//       completedAt: null // Will be set when task is completed
//     };
//     setTasks([...tasks, newTask]);
//   };

//   const toggleTask = (id) => {
//     setTasks(tasks.map(task => {
//       if (task.id === id) {
//         const updatedTask = { 
//           ...task, 
//           completed: !task.completed 
//         };
        
//         // Set or clear completedAt based on completion status
//         if (updatedTask.completed) {
//           updatedTask.completedAt = new Date().toISOString();
//         } else {
//           updatedTask.completedAt = null;
//         }
        
//         return updatedTask;
//       }
//       return task;
//     }));
//   };

//   const removeTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   // Get filtered and sorted tasks
//   const getFilteredAndSortedTasks = () => {
//     // First filter the tasks
//     let result = tasks.filter(task => {
//       if (filter === 'active') return !task.completed;
//       if (filter === 'completed') return task.completed;
//       return true; // 'all' filter
//     });
    
//     // Then sort the filtered tasks
//     return result.sort((a, b) => {
//       if (sortBy === 'newest') {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       } else if (sortBy === 'oldest') {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       } else if (sortBy === 'completed') {
//         // Sort by completion time, with incomplete tasks at the end
//         if (a.completedAt && b.completedAt) {
//           return new Date(b.completedAt) - new Date(a.completedAt);
//         }
//         if (a.completedAt) return -1;
//         if (b.completedAt) return 1;
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//       return 0;
//     });
//   };

//   // Function to reset tasks and fetch new ones
//   const resetAndFetchTasks = async () => {
//     try {
//       setIsLoading(true);
//       localStorage.removeItem('tasks');
      
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }
      
//       const data = await response.json();
      
//       const formattedTasks = data.map(item => ({
//         id: `mock-${item.id}`,
//         text: item.title,
//         completed: item.completed,
//         createdAt: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(),
//         completedAt: item.completed ? new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString() : null
//       }));
      
//       setTasks(formattedTasks);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredAndSortedTasks = getFilteredAndSortedTasks();

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="px-4 py-5 sm:px-6">
//           <h1 className="text-2xl font-bold text-gray-800 text-center">Task Manager</h1>
//         </div>
        
//         <div className="border-t border-gray-200">
//           <TaskForm onAddTask={addTask} />
//         </div>
        
//         <div className="border-t border-gray-200">
//           <TaskFilter 
//             filter={filter} 
//             setFilter={setFilter} 
//             sortBy={sortBy} 
//             setSortBy={setSortBy} 
//           />
//         </div>
        
//         <div className="border-t border-gray-200">
//           {isLoading ? (
//             <div className="p-4 text-center">
//               <div className="animate-pulse text-gray-500">Loading tasks...</div>
//             </div>
//           ) : error ? (
//             <div className="p-4 text-center text-red-500">
//               Error: {error}
//             </div>
//           ) : (
//             <TaskList 
//               tasks={filteredAndSortedTasks} 
//               onToggleTask={toggleTask} 
//               onRemoveTask={removeTask} 
//             />
//           )}
//         </div>
        
//         <div className="border-t border-gray-200 p-4 flex justify-center">
//           <button
//             onClick={resetAndFetchTasks}
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
//           >
//             Reset & Fetch New Tasks
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <TaskManager />
  );
}

export default App;
