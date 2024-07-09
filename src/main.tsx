import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup.tsx";
import { AuthLayout } from "./pages/AuthLayout.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { PasswordRecovery } from "./pages/PasswordRecovery.tsx";
import { ResetPassword } from "./components/ResetPassword.tsx";
import { VerifyUser } from "./components/VerifyUser.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={true}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={true}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/recoverPassword",
        element: (
          <AuthLayout authentication={true}>
            <PasswordRecovery />
          </AuthLayout>
        ),
      },
      {
        path: "/verfiy-user",
        element: <VerifyUser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
