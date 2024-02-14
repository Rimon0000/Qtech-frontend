/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

const AddTask = () => {

    //handle new Task
    const handleAddNewTask = async(e: any) =>{
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const priority = form.priority.value;
    const status = form.status.value;

    const newTask = {
      title,
      priority,
      status
    }
    console.log(newTask);

    // //send data to the server 
    fetch('http://localhost:5000/api/tasks',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    .then(res => res.json())
    .then(data => {
        if(data && data.success){
            Swal.fire({
                title: 'Success!',
                text: 'Task added successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              
            form.reset();
        }
    })
}

  return (
    <div className="text-center my-5">
        <h1 className="text-3xl font-semibold mb-5"> Add a Task</h1>
        <div className="w-full flex justify-center items-center">
            <form onSubmit={handleAddNewTask} className="bg-slate-100 shadow-md rounded px-8 pt-6 w-full md:w-3/5 lg:w-2/5">
                <div className="mb-4">
                    <Label htmlFor="Title" className="flex text-left py-2 text-base">Title</Label>
                    <input className="shadow  border rounded w-full py-3 px-3 text-gray-700"
                      name="title"
                      type="text"
                      placeholder="Title"
                      required/>
                </div>
                <div>
                <Label htmlFor="Priority" className="flex text-left py-2 text-base">Priority</Label>
                    <select name="priority" 
                      className="shadow  border rounded w-full py-3 px-3 mb-4 text-gray-700"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="Status" className="flex text-left py-2 text-base">Status</Label>
                    <select
                      name="status"
            
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
  );
};

export default AddTask;
