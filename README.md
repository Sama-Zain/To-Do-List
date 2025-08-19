# Components
* image-section------>to{Landing--login--singup} //same design //Navlink
* Menu--------->to{HomePage---------->calender} //same design //Navlink

_________________________________________________
# Pages

* Landing-page
- image-section(left side)
- Identity-section(right side)
- button----->to {Homepage}
- signin----->to {Login page}
* Login-page
- image-section(left side)
- Authentication-section(right side)
- button------>to {Home page}
- Don't have an account---->to {signup}
* signup-page
- image-section(left side)
- Authentication-section(right side)
- button------>to {Home page}
- Already have an account------>to {Login}
* Home-page
- Menu----->{Navigation left side}
- Main-section
* Upcoming-page
- Menu----->{Navigation left side}
- Task-section(right side) {Header//Task categories}
* Today-page
- Menu----->{Navigation left side}
- Task-section(right side) {Add task, edit or delete}
* Calender-page
- Menu----->{Navigation left side}
- calender-section
* Error-page //if path is wrong
-page not found  {Error:404} //special design
_____________________________________________________________________________________
# App                                                                                             
----------
* import all pages
* Two pathes
* land---children{ Login  signup}
* Home---children{ Upcoming  Today  Calender }
# Outlet
-----------
* file---landroot{image-section--->const + Outlet}
* file---Homeroot{Menu-section--->const + Outlet}







