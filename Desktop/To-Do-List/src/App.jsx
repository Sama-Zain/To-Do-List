import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx"
import Landing from "./Pages/Landing.jsx"
import Login from "./Pages/Login.jsx"
import Register from "./Pages/Register.jsx";
import Homeroot from "./routes/Homeroot.jsx"
import Home from "./Pages/Homepage.jsx"
import Upcoming from "./Pages/Upcoming.jsx";
import Today from "./Pages/Today.jsx";
import Calender from "./Pages/Calender.jsx";
import PageTransition from "./Components/Shared/PageTransition.jsx";
import Error from "./Pages/Errorpage.jsx"
const routes = createBrowserRouter([
  {
    path: "/",
    element: (<Root />),
    errorElement:(<Error />),
    children: [
      {
        index: true,
        element: (
          <PageTransition>
            <Landing />
          </PageTransition>
        )
      },
      {
        path: "login",
        element: (
          <PageTransition>
            <Login />
          </PageTransition>
        )
      },
      {
        path: "register",
        element: (
          <PageTransition>
            <Register />
          </PageTransition>
        )
      }
    ]
  },
  {
    path: "Home",
    element: (<Homeroot />),
    children: [
      {
        index: true,
        element: (
          <PageTransition>
            <Home />
          </PageTransition>
        )
      },
      {
        path: "upcoming",
        element: (
          <PageTransition>
            <Upcoming />
          </PageTransition>
        )
      },
      {
        path: "today",
        element: (
          <PageTransition>
            <Today />
          </PageTransition>
        )
      },
      {
        path: "calender",
        element: (
          <PageTransition>
            <Calender />
          </PageTransition>
        )
      },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
