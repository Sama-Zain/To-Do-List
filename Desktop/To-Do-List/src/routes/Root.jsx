import PageTransition from "../Components/Shared/PageTransition.jsx"
import { Outlet} from 'react-router-dom'
import Img from "../Components/Shared/Image.jsx"
const Root = () => {
  return (
   <div className=" h-root flex items-center justify-center bg-body  ">
      <div className="flex w-Root p-10  gap-5 ">
        <Img />
        <div className="w-full shadow-lg rounded-4xl bg-outlet  relative">
        <PageTransition>
          <Outlet />
        </PageTransition>

        </div>        
        </div>
      </div>
  
  )
}


export default Root 