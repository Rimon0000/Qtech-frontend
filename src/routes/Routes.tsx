import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import TaskList from "@/pages/TaskList/TaskList";
import AddTask from "@/pages/TaskList/AddTask";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children: [
        {
            index: true,
            element: <TaskList></TaskList>
        },
        {
          path: "add-task",
          element: <AddTask></AddTask>
        }
      ]
    },
  ]);

export default router;