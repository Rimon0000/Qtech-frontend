import { TRouteError } from "@/components/types/type";
import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
    const {status, error } = useRouteError() as TRouteError;
  return (
    <div className="h-[100vh]">
      <main className="h-screen w-full flex flex-col justify-center items-center ">
        <img className="max-w-96 rounded-lg" src="https://i.ibb.co/6X7NSJW/error.jpg" alt="Error Image" />
        <span className='test-lg mt-5 font-semibold'>Error {status || 404}</span>
        <p className='font-semibold my-5 text-red-700'>
            {error?.message}
        </p>
        <Link to="/"><Button>Go Home</Button></Link>
      </main>
    </div>
  );
};

export default Error;