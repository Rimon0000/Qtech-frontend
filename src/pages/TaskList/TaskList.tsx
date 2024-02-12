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
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task?.title}</TableCell>
                    <TableCell>{task?.status}</TableCell>
                    <TableCell className="text-right flex items-center justify-end place-content-center mt-7">
                        <Button>  Completed</Button>
                        <hr className="border-2 border-gray-500 h-8 inline-block mx-2"></hr>
                        <Button className="p-1" variant="destructive">
                            <Trash2 onClick={() => handleDelete(task.id)}></Trash2>
                        </Button>
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