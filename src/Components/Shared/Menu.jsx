import { Search, CalendarDays, StickyNote, ListTodo, LogOut, MenuIcon, ChevronsRight } from "lucide-react";
import { FaAlignLeft, FaTrash } from "react-icons/fa";
import { NavLink} from "react-router";
import { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaPalette } from "react-icons/fa"; 
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useTasks } from "../../routes/TasksContext.jsx";

const Menu = () => {
  const navigate = useNavigate();

  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("lists");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Work", color: "bg-work" },
          { id: 2, name: "Personal", color: "bg-personal" },
          { id: 3, name: "Study", color: "bg-study" },
        ];
  });
  const [newList, setNewList] = useState("");
  const [color, setColor] = useState("bg-yellow-500");
  const [showColors, setShowColors] = useState(false);

  const colors = [
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-300",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-rose-200",
    "bg-indigo-500",
    "bg-sky-200",
    "bg-black",
  ];

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addNewList = () => {
    if (newList.trim() === "") return;
    const newItem = {
      id: Date.now(),
      name: newList,
      color,
    };
    setLists([...lists, newItem]);
    setNewList("");
    setColor("bg-yellow-500");
    setShowColors(false); 
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };
  const { tasks, tomorrowTasks, weekTasks } = useTasks();

  const upcomingCount = tasks.length + tomorrowTasks.length + weekTasks.length;
  const todayCount = tasks.length;

  return (
    <motion.div 
      className="bg-menu  m-3 rounded-4xl w-menu shadow-lg p-10 h-menu"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold font-[Oswald] mb-3 flex justify-between items-center">
        Menu
        <span>
          <MenuIcon size={25} />
        </span>
      </h1>

      {/* Search */}
      <div className="flex items-center justify-center bg-search rounded-4xl p-2">
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* Tasks */}
        <div className="mt-3 p-5">
        <h2 className="font-bold text-2xl font-[Oswald]">Tasks</h2>
        <ul className="text-gray-700">
          <li>
            <NavLink to="upcoming" className={({ isActive }) =>
    `flex justify-between p-2 rounded-4xl transition-colors duration-300 ${
      isActive ? "bg-active " : "hover:bg-gray-200"
    }`
  }
>
              <span className="flex items-center gap-2 cursor-pointer transition-transform duration-500 hover:translate-x-2">
                <ChevronsRight size={18} /> Upcoming
              </span>
              <span className="bg-search rounded-full w-7 h-6 flex items-center justify-center">
                {upcomingCount}+
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="today" className={({ isActive }) =>
    `flex justify-between p-2 rounded-4xl transition-colors duration-300 ${
      isActive ? "bg-active " : "hover:bg-gray-200"
    }`
  }
>
              <span className="flex items-center gap-2 cursor-pointer transition-transform duration-500 hover:translate-x-2">
                <ListTodo size={18} />
                Today
              </span>
              <span className="bg-search rounded-full w-6 h-6 flex items-center justify-center">
                {todayCount}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="calender" className={({ isActive }) =>
    `flex justify-between p-2 rounded-4xl transition-colors duration-300 ${
      isActive ? "bg-active " : "hover:bg-gray-200"
    }`
  }
>
              <span className="flex items-center gap-2 cursor-pointer transition-transform duration-500 hover:translate-x-2">
                <CalendarDays size={18} /> Calender
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="flex justify-between p-2">
              <span className="flex items-center gap-2">
                <StickyNote size={18} />
                Sticky Wall
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Lists */}
      <div className="pl-5">
        <h2 className="font-bold text-2xl font-[Oswald]">Lists</h2>
        <ul className="space-y-2 p-1 text-gray-700">
          <AnimatePresence>
            {lists.map((list) => (
              <motion.li
                key={list.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-search rounded-4xl p-1 cursor-pointer hover:bg-active"
              >
                <span className="flex items-center gap-3">
                  <span className={`w-5 h-3 rounded-4xl ${list.color}`}></span>
                  {list.name}
                </span>
                <button
                  onClick={() => deleteList(list.id)}
                  className="text-gray-600 cursor-pointer hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>

          
          <li className="flex p-1 text-gray-700 relative bg-search rounded-4xl">
            <div className="flex items-center relative">
              <AiOutlinePlusCircle
                className="w-6 h-6 text-gray-700 cursor-pointer mr-2"
              />
              <input
                type="text"
                placeholder="Add new list"
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNewList()}
                className="bg-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowColors(!showColors)}
              className="rounded-full hover:bg-gray-200"
            >
              <FaPalette className="text-xl text-gray-600 cursor-pointer" />
            </button>
            <AnimatePresence>
              {showColors && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-1 bg-white shadow-lg rounded-2xl flex flex-wrap p-2 gap-2 z-10"
                >
                  {colors.map((c) => (
                    <span
                      key={c}
                      className={`w-6 h-6 rounded-full cursor-pointer ${color === c ? "border-2 border-black" : ""} ${c}`}
                      onClick={() => setColor(c)}
                    ></span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>

      {/* Settings & Signout */}
      <div className="mt-10 space-y-3 text-gray-600">
        <motion.div 
          className="flex items-center gap-2 cursor-pointer text-xl hover:text-gray-800"
          whileHover={{ x: 5 }}
        >
          <FaAlignLeft size={18} /> Settings
        </motion.div>
        <motion.div 
          className="flex items-center gap-2 cursor-pointer text-xl hover:text-red-800"
          whileHover={{ x: 5 }}
          onClick={() =>{
            navigate("/");
            localStorage.removeItem("token")
          }}
        >
          <LogOut size={18} /> Sign Out
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Menu;
