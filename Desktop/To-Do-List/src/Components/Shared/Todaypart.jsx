import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useTasks } from "../../routes/TasksContext";

const Todaypart = ({ className }) => {
  const { tasks, setTasks } = useTasks(); 
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      date: new Date().toISOString().slice(0,10) 

    };
    setTasks([...tasks, task]); 
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={`border border-gray-400 rounded-4xl mt-3 w-4xl ${className}`}>
      <div className="p-5 pl-10 flex flex-col gap-4">
        <h1 className="font-[Oswald] text-4xl">Today</h1>

        {/* Input */}
        <div className="flex items-center border border-gray-400 rounded-xl p-2 gap-2">
          <AiOutlinePlusCircle
            className="w-6 h-6 text-gray-700 cursor-pointer ml-2"
            onClick={addTask}
          />
          <input
            type="text"
            placeholder="Add new task..."
            className="flex-grow outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
        </div>

        {/* List with animation */}
        <div className="flex flex-col divide-y divide-gray-400 -mt-2 pl-2">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-2 py-2 pl-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-700"
                    }
                  >
                    {task.text}
                  </span>
                </div>

                <FaTrash
                  className="text-gray-600 cursor-pointer hover:text-red-600"
                  onClick={() => deleteTask(task.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Todaypart;
