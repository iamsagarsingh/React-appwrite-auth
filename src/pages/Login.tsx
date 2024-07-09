import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { authService } from "../appwrite/Auth";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { dispatch } = useAuth();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    authService.Login(email, password).then(() => {
      authService.getAcc().then((data) => {
        if (data) dispatch({ type: "LOGIN", payload: data.name });
      });
    });
  }
  return (
    <div className="w-1/2 mx-auto text-center">
      <h2 className="my-4">Login Here...</h2>
      <form className="flex flex-col gap-2 text-left" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-300 p-1 rounded-md">
          Submit
        </button>
      </form>
      <p>
        <Link to="/signup">No Account? Cick here</Link>
      </p>
      <p>
        <Link to="/recoverPassword">Forget Password.</Link>
      </p>
    </div>
  );
}
