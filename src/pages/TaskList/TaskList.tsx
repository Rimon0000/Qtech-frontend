import { TTask } from "@/components/types/type";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { FilePenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const TaskList = () =>{
    const [tasks, setTasks] = useState<TTask[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [selectItem, setSelectItem] = useState('')

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


  //handle delete
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/api/tasks/${id}`,{
          method: "DELETE",
        });
        const remaining = tasks.filter(task => task._id !== id)
        setTasks(remaining)
        Swal.fire({
          title: "Deleted!",
          text: "Task Deleted Successfully.",
          icon: "success"
        });
      }
    });
  };
  

  //handle complete
  const handleMakeComplete = (id : string) =>{
    console.log(id);
    fetch(`http://localhost:5000/api/tasks/status-complete/${id}`,{
      method: 'PATCH'
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      if(data && data.success){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "The Task is Completed Now!",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  //filter by priority
    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectItem(e.target.value)
    }
    const filterBasedOnPriority = tasks.filter(task => task.priority === selectItem || selectItem === '')


    return (
        <div className="">
            <div className="text-right mb-2 font-semibold">
                <select value={selectItem || ""} onChange={handleChange} className="border-2 py-2 px-4 rounded-md">
                  <option value="" className='bg-slate-300 px-8 py-2'>Filter By Priority</option>
                  <option value="low">Low</option>
                  <option  value="medium">Medium</option>
                  <option  value="high">High</option>
                </select>
            </div>
            <div className="max-w-full overflow-x-scroll">
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
                  {filterBasedOnPriority.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell>{task?.title}</TableCell>
                      <TableCell>{task?.priority}</TableCell>
                      <TableCell>{task?.status}</TableCell>
                      <TableCell className="text-right flex items-center justify-end place-content-center mt-7">
                        <div className="flex justify-end items-center space-x-2">
                          {task.status === 'completed' ? 'Completed' :
                            <Button
                              onClick={() => handleMakeComplete(task._id)}
                              className=" hover:bg-slate-600  px-4 py-2 rounded-md"
                            >
                              Mark Completed
                            </Button>
                          }
                          <hr className="border-2 mx-2 h-7 bg-slate-800"></hr>
                          <Button variant="destructive" onClick={() => handleDelete(task._id)}
                            className=" hover:bg-slate-700 px-2 py-2 rounded-md"
                          >
                            <Trash2/>
                          </Button>
                          <hr className="border-2 h-7 bg-slate-800"></hr>
                          <Link to={`update-task/${task._id}`}>
                            <Button className="hover:bg-slate-600 hover:text-white  px-2 py-2 rounded-md" variant="secondary">
                              <FilePenLine></FilePenLine>
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="text-slate-800">
                  <TableRow className="text-lg">
                      <TableCell>Number of Total Tasks:</TableCell>
                      <TableCell>{tasks.length}</TableCell>
                      <TableCell>Number of Total Completed Tasks:</TableCell>
                      <TableCell>{completedTasksCount}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
        </div>    
    )
}

export default TaskList;