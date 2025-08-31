import { motion } from 'framer-motion';
import Todaypart from "../Components/Shared/Todaypart.jsx";
import PageTransition from "../Components/Shared/PageTransition.jsx";
import { useTasks } from "../routes/TasksContext.jsx";

const Today = () => {
  const { tasks, setTasks } = useTasks(); 

 
  const todayCount = tasks.length;

  return (
    <PageTransition>
      <div className='flex flex-col gap-5 m-5'>
        {/* Header */}
        <div className='flex gap-5'>
          <h1 className='font-[Oswald] text-4xl'>Today</h1>
          <motion.div 
            className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-2xl text-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {todayCount}
          </motion.div>
        </div>

        {/* Today Tasks */}
        <Todaypart 
          tasks={tasks.filter(task => task.category === "today")} 
          setTasks={setTasks} 
          className="h-box_today"
        />
      </div>
    </PageTransition>
  );
};

export default Today;
