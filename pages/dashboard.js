import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter();

  const getProfile = async () => {
    const response = await axios.get("/api/profile");
    console.log(response);
    setUser(response.data);
  };

  const logout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      console.log(response);
      // redirecc ionamiento
      router.push("/login");
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => getProfile()}>get profile</button>
      <br />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
