import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../appwrite/Auth";
import { useState } from "react";

export function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && secret) {
      authService.updatePasswordRecovery(userId, secret, password).then(() => {
        alert("Yehh!! password reset done.");
        navigate("/login");
      });
    } else {
      alert("Invalid or missing parameters.");
    }
  };

  return (
    <div className="w-1/2 mx-auto text-center">
      <h2>Rest your new Password below:</h2>
      <form className="flex flex-col gap-2 text-left" onSubmit={handleReset}>
        <label>New Password:</label>
        <input
          type="password"
          className="p-2"
          placeholder="New Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
