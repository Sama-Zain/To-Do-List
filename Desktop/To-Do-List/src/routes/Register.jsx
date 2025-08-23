
import { NavLink } from "react-router-dom"

const Register = () => {
  return (


<div className=" relative top-20  ml-15 p-10  ">
    <h1 className="text-3xl font-[Oswald] font-bold" >Sign up</h1>
    <div className="flex flex-col mt-5 gap-5  ">
        <input type="text" placeholder="First Name" className=" p-1 border rounded-lg w-80"/>
        <input type="text" placeholder="Last Name" className=" p-1 border rounded-lg w-80"/>
        <input type="email" placeholder="E-mail addres" className=" p-1 border rounded-lg w-80"/>
        <div class="relative ">
         <input 
            type="password" 
            placeholder="Password" 
            class=" p-1 pr-10  rounded-lg border-1 w-80 "
          />
           <img src="eye.png" 
              class="absolute left-70 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer" 
            alt="show password" />
        </div>
        <div class="relative ">
         <input 
            type="password" 
            placeholder="Re-enter the password" 
            class=" p-1 pr-10  rounded-lg border-1 w-80 "
          />
        </div>

        <button className=" bg-[var(--btn-color)] cursor-pointer shadow-xl text-black font-semibold font-[inder] p-2 rounded-xl w-80 hover:scale-105 transition-all duration-300">Sign Up</button>
      
       <div className=" cursor-pointer w-80 flex justify-center" >Already have an account?
      <NavLink to="/login" className="ml-2 hover:text-green-500"> Sign In</NavLink>
     </div>

  </div>
    
    
 </div>




  )
}

export default Register