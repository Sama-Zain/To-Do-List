import Image from "/Rectangle 3 (2).png"
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";

const Root = () => {
  const location = useLocation();
  return (
   <div className="w-screen h-screen flex items-center justify-center bg-[var(--body-color)] fixed ">
      <div className="flex w-[--width-Root] p-10  gap-5 ">
        <div className="w-full shadow-lg rounded-4xl">
          <img
            src={Image}
            alt="To Do"
            className="object-cover object-center  "
          />
        </div>
        <div className="w-full shadow-lg rounded-4xl bg-[var(--div-outlet)]  relative">
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5}}   
            >
          <Outlet /> 
          </motion.div>
          </AnimatePresence>
        </div>        
        </div>
      </div>
  
  )
}

export default Root 