import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { FilePenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const TaskList = () =>{
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [completedTasksCount, setCompletedTasksCount] = useState(0);

    //for get data
    useEffect(() =>{
        fetch("http://localhost:5000/api/tasks")
        .then(res => res.json())
        .then(data => {
            setTasks(data.data)
            setIsLoading(false)
        })
    })

    // for count completed
    useEffect(() => {
        // Count completed tasks
        const completedTasks = tasks.filter((task) => task.status === "completed");
        setCompletedTasksCount(completedTasks.length);
      }, [tasks]);

    if (isLoading) {
        return <p>Loading .....</p>;
      }

    //
    const handleDelete = () =>{
        console.log("delete");
    }


    return (
        <div className="border-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-semibold">
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task?.title}</TableCell>
                    <TableCell>{task?.priority}</TableCell>
                    <TableCell>{task?.status}</TableCell>
                    <TableCell className="text-right flex items-center justify-end place-content-center mt-7">
                      <div className="flex justify-end items-center space-x-2">
                        <Button
                          onClick={() => handleDelete(task.id)}
                          className=" hover:bg-slate-600  px-4 py-2 rounded-md"
                        >
                          Completed
                        </Button>
                        <hr className="border-2 h-7 bg-slate-800"></hr>
                        <Button variant="destructive"
                          onClick={() => handleDelete(task._id)}
                          className=" hover:bg-slate-700  px-4 py-2 rounded-md"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                        <hr className="border-2 h-7 bg-slate-800"></hr>
                        <Link to={`update-task/${task._id}`}>
                          <Button className="hover:bg-slate-600 hover:text-white  px-4 py-2 rounded-md" variant="secondary">
                            <FilePenLine></FilePenLine>
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="">
                <TableRow className="text-xl">
                    <TableCell>Number of Total Tasks:</TableCell>
                    <TableCell>{tasks.length}</TableCell>
                    <TableCell>Number of Total Completed Tasks:</TableCell>
                    <TableCell>{completedTasksCount}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
        </div>    
    )
}

export default TaskList;