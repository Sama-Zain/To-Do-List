import PageTransition from "../Components/Shared/PageTransition.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTasks } from "../routes/TasksContext.jsx";

const Calender = () => {
  const { tasks, tomorrowTasks, weekTasks } = useTasks();
  const allTasks = [...tasks, ...tomorrowTasks, ...weekTasks];
  const events = allTasks.map(task => ({
    title: task.text,
    date: task.date,   
    backgroundColor: task.completed ? 'gray' : 'bg-blue-500'
  }));

  return (
    <PageTransition>
      <div className="m-5 flex justify-between items-center w-full">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          weekends={true}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          height="100%"   
          contentHeight="auto"  
          expandRows={true}    
        />
      </div>
    </PageTransition>
  );
};

export default Calender;
