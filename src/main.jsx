import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Root from "./components/Root.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Pages/Home.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,

        Component: Home,
      },

      // { path: "/register", Component: Register },
      // { path: "/login", Component: Login },
      // {
      //   path: "/myprofile",
      //   element: (
      //     <ProtectedRoute>
      //       <MyProfile />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/toy/:id",
      //   element: (
      //     <ProtectedRoute>
      //       <ToyDetails />
      //     </ProtectedRoute>
      //   ),
      // },
      // { path: "/dashboard", Component: Dashboard },
      // { path: "*", Component: ErrorPage },
      // {
      //   path: "/forgot-password",
      //   Component: ForgotPassword,
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    ,
  </StrictMode>
);
