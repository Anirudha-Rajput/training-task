import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

function Profile() {

  const {data,isLoading,error} = useQuery({
    queryKey:["profile"],
    queryFn: async()=>{
      const res = await api.get("/user/profile");
      console.log(res.data)
      return res.data;
    }
  });

  if(isLoading) return <h2 className="text-center mt-10">Loading...</h2>

  if(error) return <h2 className="text-center mt-10">Error loading profile</h2>

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h1 className="text-xl font-semibold mb-4 text-center">
          Profile
        </h1>

        <p className="mb-2">
          <strong>Name:</strong> {data.user.name}
        </p>

        <p>
          <strong>Email:</strong> {data.user.email}
        </p>

      </div>

    </div>
  );
}

export default Profile;