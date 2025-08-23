import { NavLink } from "react-router-dom"
 
 const Login = () => {
  return (

       <div className=" relative top-30  ml-15 p-10  ">
    <h1 className="text-3xl font-[Oswald] font-bold" >Sign in</h1>
    <div className=" flex flex-col mt-5 gap-5  ">
        <input type="email" placeholder="mail.exemple@mail.com" className=" p-1 border rounded-lg w-80"/>
        <div class="relative ">
         <input 
            type="password" 
            placeholder="**************" 
            class=" p-1 pr-10  rounded-lg border-1 w-80 "
          />
           <img src="eye.png" 
              class="absolute left-70 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer" 
            alt="show password" />
        </div>
        <button className=" bg-[var(--btn-color)] cursor-pointer shadow-xl text-black font-semibold font-[inder] p-2 rounded-xl w-80 hover:scale-105 transition-all duration-300">Sign in</button>
      
      <div class="flex items-center justify-center w-80 ">
       <div class="flex-grow h-px bg-gray-500"></div>
       <span class="px-5 text-gray-600">or</span>
       <div class="flex-grow h-px bg-gray-500"></div>
      </div>
    <div class="flex gap-10  font-[inder] w-80">
  
    <button class="flex items-center gap-2  rounded-lg  p-1.5 w-40 justify-center bg-[var(--btn-icon)] cursor-pointer hover:bg-gray-300">
    <img src="/🦆 icon _google icon_.png" alt="Google" class="w-5 h-5"/>
    <span>Google</span>
    </button>

   <button class="flex items-center gap-2  rounded-lg   w-40 justify-center bg-[var(--btn-icon)]  cursor-pointer hover:bg-gray-300">
    <img src="/🦆 icon _Facebook v1 icon_.png" alt="Facebook" class="w-5 h-5"/>
    <span>Facebook</span>
   </button>
    </div>

    <div className=" cursor-pointer flex justify-center font-[inder] w-80 " >Don't have an account? 
      <NavLink to="/register" className="ml-2 hover:text-green-500"> Sign up</NavLink>
     </div>
  </div>
    
    
 </div>
    
  )
}

export default Login