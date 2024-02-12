import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Dashboard from "@/pages/Dashboard";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children: [
        {
            index: true,
            element: <Dashboard></Dashboard>
        }
      ]
    },
  ]);

export default router;