import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx"
import Landing from "./routes/Landing.jsx"
import Login from "./routes/Login.jsx"
import Register from "./routes/Register.jsx";
const routes = createBrowserRouter([
  {
    path: "/",
    element:( <Root />),
    children:[
      {
        index:true,
        element:(<Landing/>)
      },
      {
        path:"login",
        element:( <Login /> ) 
      },
      {
        path:"register",
        element:( <Register /> ) 
      }
    ] 
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}


