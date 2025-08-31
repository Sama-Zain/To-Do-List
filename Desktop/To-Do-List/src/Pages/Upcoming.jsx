import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Todaypart from "../Components/Shared/Todaypart.jsx";
import PageTransition from "../Components/Shared/PageTransition.jsx";
import { useTasks } from "../routes/TasksContext.jsx";

const Upcoming = () => {
  const { tasks, setTasks, tomorrowTasks, setTomorrowTasks, weekTasks, setWeekTasks } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [newTomorrow, setNewTomorrow] = useState("");
  const [newWeek, setNewWeek] = useState("");
  const [weekOffset, setWeekOffset] = useState(1); 
  const [loaded, setLoaded] = useState(false); 

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedTomorrow = JSON.parse(localStorage.getItem("tomorrowTasks")) || [];
    const savedWeek = JSON.parse(localStorage.getItem("weekTasks")) || [];

    setTasks(savedTasks);
    setTomorrowTasks(savedTomorrow);
    setWeekTasks(savedWeek);

    setLoaded(true);
  }, []);


  useEffect(() => { if (loaded) localStorage.setItem("tasks", JSON.stringify(tasks)); }, [tasks, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem("tomorrowTasks", JSON.stringify(tomorrowTasks)); }, [tomorrowTasks, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem("weekTasks", JSON.stringify(weekTasks)); }, [weekTasks, loaded]);


  const addTomorrow = () => {
    if (!newTomorrow.trim()) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().slice(0, 10);

    setTomorrowTasks([
      ...tomorrowTasks,
      { id: Date.now(), text: newTomorrow, completed: false, date: dateString }
    ]);

    setNewTomorrow("");
  };

  
  const addWeek = () => {
    if (!newWeek.trim()) return;

    const weekDate = new Date();
    weekDate.setDate(weekDate.getDate() + weekOffset); 
    const dateString = weekDate.toISOString().slice(0, 10);

    setWeekTasks([
      ...weekTasks,
      { id: Date.now(), text: newWeek, completed: false, date: dateString }
    ]);

    setNewWeek("");
    setWeekOffset(1); 
  };

  const deleteTomorrow = (id) => setTomorrowTasks(tomorrowTasks.filter(t => t.id !== id));
  const deleteWeek = (id) => setWeekTasks(weekTasks.filter(t => t.id !== id));

  const upcomingCount = tasks.length + tomorrowTasks.length + weekTasks.length;

  return (
    <PageTransition>
      <div className='flex flex-col gap-5 m-5'>
        {/* Header */}
        <div className='flex gap-5'>
          <h1 className='font-[Oswald] text-4xl'>Upcoming</h1>
          <motion.div 
            className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-2xl text-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {upcomingCount}
          </motion.div>
        </div>

        {/* Today */}
        <Todaypart 
          tasks={tasks} 
          setTasks={setTasks} 
          newTask={newTask} 
          setNewTask={setNewTask} 
          className="pb-30"
        />    

        {/* Tomorrow & This Week */}
        <div className='flex gap-5 w-full pb-30 '>
          <TaskColumn
            title="Tomorrow"
            tasks={tomorrowTasks}
            setTasks={setTomorrowTasks}
            newTask={newTomorrow}
            setNewTask={setNewTomorrow}
            addTask={addTomorrow}
          />

          <TaskColumn
            title="This Week"
            tasks={weekTasks}
            setTasks={setWeekTasks}
            newTask={newWeek}
            setNewTask={setNewWeek}
            addTask={addWeek}
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Upcoming;

// TaskColumn Component
const TaskColumn = ({ title, tasks, setTasks, newTask, setNewTask, addTask, weekOffset, setWeekOffset }) => (
  <div className='border border-gray-400 rounded-4xl w-1/2'>
    <div className='p-5 pl-10 flex flex-col gap-4 pb-30'>
      <h1 className='font-[Oswald] text-4xl'>{title}</h1>

      <div className="flex items-center border border-gray-400 rounded-xl p-2 gap-2">
        <AiOutlinePlusCircle 
          className="w-6 h-6 text-gray-700 cursor-pointer ml-2" 
          onClick={addTask} 
        />
        <input 
          type="text" 
          placeholder='Add new task...'
          className='flex-grow outline-none'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />

        
        {title === "This Week" && (
          <select
            value={weekOffset}
            onChange={(e) => setWeekOffset(Number(e.target.value))}
            className="border-2 border-gray-400 rounded-md p-1 text-sm"
          >
            <option value={1}>1 day</option>
            <option value={2}>2 days</option>
            <option value={3}>3 days</option>
            <option value={4}>4 days</option>
            <option value={5}>5 days</option>
            <option value={6}>6 days</option>
            <option value={7}>7 days</option>
          </select>
        )}
      </div>

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
                  onChange={() => {
                    const updated = [...tasks];
                    updated[index].completed = !updated[index].completed;
                    setTasks(updated);
                  }}
                />
                <span className={task.completed ? "line-through text-gray-500" : "text-gray-700"}>
                  {task.text}
                </span>
              </div>
              <FaTrash 
                className="text-gray-600 cursor-pointer hover:text-red-600"
                onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  </div>
);
