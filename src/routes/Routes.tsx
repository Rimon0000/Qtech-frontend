import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import TaskList from "@/pages/TaskList/TaskList";
import AddTask from "@/pages/TaskList/AddTask";
import UpdateTask from "@/pages/TaskList/UpdateTask";
import Home from "@/pages/TaskList/Home";
import Error from "@/pages/ErrorPage/Error";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <Error></Error>,
      children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: "task-list",
          element: <TaskList></TaskList>
      },
        {
          path: "add-task",
          element: <AddTask></AddTask>
        },
        {
          path: "task-list/update-task/:id",
          element: <UpdateTask></UpdateTask>,
          loader: ({params}) => fetch(`https://qtec-backend.vercel.app/api/tasks/${params.id}`)
        }
      ]
    },
  ]);

export default router;