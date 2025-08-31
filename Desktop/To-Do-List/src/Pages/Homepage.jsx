import React from 'react'
import { NavLink } from 'react-router'

const Homepage = () => {
  return (
    <div className="bg-menu m-3 rounded-4xl w-5xl h-menu shadow-lg p-10">
      <div className='flex flex-col items-center justify-center relative m-auto top-30  w-180'>
        <h1 className='font-[Oswald]  text-4xl'> Wellcome to ToDoPy</h1>
        <div className='mt-10 text-xl text-center '>
            <p > A to-do app is a simple, user-friendly digital tool designed to help individuals and teams organize tasks and manage their daily activities
              efficiently. Users can create, edit, and prioritize tasks, set deadlines or reminders, categorize items, and track their progress, all within an intuitive and accessible interface. These apps are essential 
              for improving productivity, reducing stress, and ensuring that important responsibilities are not forgotten
               </p>
      </div>
      <NavLink to="upcoming">
      <button className='font-[Oswald] text-3xl  mt-15 bg-btn rounded-xl p-2 w-70 cursor-pointer'> Go to tasks
      </button>
      </NavLink>
      </div>
    
    </div>
  )
}

export default Homepage