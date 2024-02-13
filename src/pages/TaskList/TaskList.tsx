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
        <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-semibold">
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task?.title}</TableCell>
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
                        <Button
                          onClick={() => handleDelete(task.id)}
                          className=" hover:bg-slate-700  px-4 py-2 rounded-md"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="">
                <TableRow className="text-xl">
                    <TableCell>Total Tasks</TableCell>
                    <TableCell>{tasks.length}</TableCell>
                    <TableCell>Total Completed Tasks</TableCell>
                    <TableCell>{completedTasksCount}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
        </div>    
    )
}

export default TaskList;