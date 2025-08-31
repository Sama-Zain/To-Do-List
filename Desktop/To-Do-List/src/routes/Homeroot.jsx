
import { Outlet } from 'react-router'
import Menu from '../Components/Shared/Menu.jsx' 

const Homeroot = () => {
  return (
    <>
    <div className='flex '>
      <Menu />
      <Outlet />
      </div>
    </>
  )
}

export default Homeroot
