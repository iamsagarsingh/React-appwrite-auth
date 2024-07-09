import { useState } from "react";
import { authService } from "../appwrite/Auth";

export function PasswordRecovery() {
  const [email, setEmail] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await authService.recoverPassword(email);
    alert("Recovery email sended...");
  }

  return (
    <div className="w-1/2 mx-auto text-center">
      <h2>Password Recovery!!!</h2>
      <form className="flex flex-col gap-2 text-left" onSubmit={handleSubmit}>
        <label>Enter your Registered Email:</label>
        <input
          type="text"
          className="p-2"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-300 p-1 rounded-md">
          Send Recovery Email.
        </button>
      </form>
    </div>
  );
}
