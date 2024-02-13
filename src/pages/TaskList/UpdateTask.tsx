import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateTask = () =>{
    const task = useLoaderData()
    const {_id, title, status, priority} = task.data
    console.log(_id);

    const [isPriority, setPriority] = useState(priority);
    const [isStatus, setStatus] = useState(status);


    const handleUpdate = (e) =>{
        e.preventDefault()
        const form = e.target 
        const updatedTitle = form.title.value;
    
        const updateTask = {
            title: updatedTitle,
            priority: isPriority,
            status: isStatus
        }

        //send data to the server
        fetch(`http://localhost:5000/api/tasks/update-task/${_id}`,{
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(updateTask)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data && data.success){
            Swal.fire({
              title: 'Success!',
              text: 'Task Updated successfully',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
          }
        })
    }

    return (
      <div className="text-center my-5">
        <h1 className="text-3xl font-semibold mb-5">Update Task</h1>
      <div className="w-full flex justify-center items-center">
            <form onSubmit={handleUpdate} className="bg-slate-100 shadow-md rounded px-8 pt-6 w-full md:w-3/5 lg:w-2/5">
                <div className="mb-4">
                    <Label htmlFor="Title" className="flex text-left py-2 text-base">Title</Label>
                    <input className="shadow  border rounded w-full py-3 px-3 text-gray-700"
                      name="title"
                      type="text"
                      placeholder="Title"
                      defaultValue={title}
                      required/>
                </div>
                <div>
                <Label htmlFor="Priority" className="flex text-left py-2 text-base">Priority</Label>
                    <select value={isPriority} onChange={(e) => setPriority(e.target.value)} 
                      className="shadow  border rounded w-full py-3 px-3 mb-4 text-gray-700"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="Status" className="flex text-left py-2 text-base">Status</Label>
                    <select value={isStatus} onChange={(e) => setStatus(e.target.value)}                     
                      className="shadow  border rounded w-full py-3 px-3 mb-6 text-gray-700"
                    >
                      <option value="completed">Completed</option>
                      <option value="incomplete">InCompleted</option>
                    </select>
                </div>
                <div className="pb-3">
                  <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    </div>
      
    )
}

export default UpdateTask


