import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import TaskList from "@/pages/TaskList/TaskList";
import AddTask from "@/pages/TaskList/AddTask";
import UpdateTask from "@/pages/TaskList/UpdateTask";
  
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
        },
        {
          path: "update-task/:id",
          element: <UpdateTask></UpdateTask>,
          loader: ({params}) => fetch(`http://localhost:5000/api/tasks/${params.id}`)
        }
      ]
    },
  ]);

export default router;