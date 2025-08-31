import Img from "/Rectangle 3 (2).png"
import PageTransition from "./PageTransition.jsx"
const Image = () => {
  return (

     <div className="w-full shadow-lg rounded-4xl">
          <img
            src={Img}
            alt="To Do"
            className="object-cover object-center  "
      />
        </div>

  )
}

export default Image 