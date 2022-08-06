import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await axios.post("/api/auth/login", credentials);
    console.log(response);
    
    if (response.status === 200) {
      // redireccionamiento
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
