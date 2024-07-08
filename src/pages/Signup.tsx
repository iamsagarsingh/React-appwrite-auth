import { useState } from "react";
import { authService } from "../appwrite/Auth";
import { useAuth } from "../context/UserContext";
import { Link } from "react-router-dom";

export function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { dispatch } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    authService.Signup(name.trim(), email.trim(), password.trim()).then(() => {
      dispatch({ type: "LOGIN", payload: name.trim() });
    });
  }
  return (
    <div className="w-1/2 mx-auto text-center">
      <h2 className="my-4">Signup Here...</h2>
      <form className="flex flex-col gap-2 text-left" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          placeholder="email..."
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
      <span>
        <Link to="/login">Have Account? Cick here</Link>
      </span>
    </div>
  );
}
