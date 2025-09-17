import { NavLink } from "react-router"


const Landing = () => {
  return (
  <div className=" relative top-35 ml-15 p-10">
    <h1 className="text-3xl font-[Oswald]  pl-30 text-shadow-lg pb-4" >ToDo Py</h1>
          <div className="font-medium text-black pb-4 ">
     <p>Stay Organized Gt Things Done : Your </p>
     <p>Ultimate To-Do list App. </p>
     <p>A todo list app is a digital task management </p>
      <p> tool designed to help users organize and</p>
     <p>prioritixe their daily activities and</p>
       <p>responsibilities.</p>
                    </div>

          <NavLink to="/Home">
        <button className="bg-btn cursor-pointer shadow-xl text-black font-semibold p-2 rounded-xl w-80 hover:scale-105 transition-all duration-300">
          Get Started
        </button>
      </NavLink>
       <div className=" cursor-pointer w-80 flex justify-center mt-4" >Already have an account?
      <NavLink to="/login" className="ml-2 hover:text-green-500"> Sign In</NavLink>
     </div>

  
    
    
 </div>
  )
}

export default Landing
