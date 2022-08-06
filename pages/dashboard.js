import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const getProfile = async () => {
    const response = await axios.get("/api/profile");
    console.log(response);
    setUser(response.data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => getProfile()}>get profile</button>
    </div>
  );
};

export default Dashboard;
