import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import TaskList from "@/pages/TaskList/TaskList";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children: [
        {
            index: true,
            element: <TaskList></TaskList>
        }
      ]
    },
  ]);

export default router;