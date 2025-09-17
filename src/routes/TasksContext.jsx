import { createContext, useContext, useState, useEffect } from "react";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [tomorrowTasks, setTomorrowTasks] = useState(() => {
    const saved = localStorage.getItem("tomorrowTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [weekTasks, setWeekTasks] = useState(() => {
    const saved = localStorage.getItem("weekTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tomorrowTasks", JSON.stringify(tomorrowTasks));
  }, [tomorrowTasks]);

  useEffect(() => {
    localStorage.setItem("weekTasks", JSON.stringify(weekTasks));
  }, [weekTasks]);

  const addTaskToday = (task) => setTasks([...tasks, task]);
  const addTaskTomorrow = (task) => setTomorrowTasks([...tomorrowTasks, task]);
  const addTaskWeek = (task) => setWeekTasks([...weekTasks, task]);

  return (
    <TasksContext.Provider
      value={{
        tasks, setTasks,
        tomorrowTasks, setTomorrowTasks,
        weekTasks, setWeekTasks,
        addTaskToday, addTaskTomorrow, addTaskWeek
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
