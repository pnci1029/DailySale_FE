import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Contact } from "./components/contactus/Contact";
import { AboutUs } from "./components/aboutus/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
]);

export default router; 