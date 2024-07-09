import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../appwrite/Auth";
import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";

export function VerifyUser() {
  const [status, setStatus] = useState<string>("verifying user...");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const { dispatch } = useAuth();

  useEffect(() => {
    if (userId && secret) {
      authService.updateUserVerification(userId, secret).then(() => {
        alert("User Verified.");
        authService.getAcc().then((data) => {
          if (data) {
            setStatus("user verified...");
            dispatch({ type: "LOGIN", payload: data.name });
            navigate("/");
          }
        });
      });
    }
  }, [userId, secret]);

  return (
    <>
      <p>{status}</p>
    </>
  );
}
