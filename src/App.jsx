// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindPartners from "./pages/Findpartners";
import CreateProfile from "./pages/CreateProfile";
import PartnerDetails from "./pages/PartnerDetails";
import MyConnections from "./pages/MyConnections";
import Profile from "./pages/Profile"; // rename this file to Profile.jsx later
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/find-partners",
        element: <FindPartners />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/partner/:id",
        element: (
          <PrivateRoute>
            <PartnerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-profile",
        element: (
          <PrivateRoute>
            <CreateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-connections",
        element: (
          <PrivateRoute>
            <MyConnections />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;