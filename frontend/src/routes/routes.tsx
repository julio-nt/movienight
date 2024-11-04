// routes/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/index.tsx";
import Home from "../pages/Home";
import Liked from "../pages/Liked/index.tsx";
import Favorites from "../pages/Favorites/index.tsx";
import Recommended from "../pages/Recommended";
import Search from "../pages/Search";
import Wish from "../pages/Wish/index.tsx";
import Disliked from "../pages/Disliked/index.tsx";
import Hated from "../pages/Hate/index.tsx";
import Login from "../pages/Login/index.tsx";
import Register from "../pages/Register/index.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/recommended", element: <Recommended /> },
      { path: "/liked", element: <Liked /> },
      { path: "/disliked", element: <Disliked /> },
      { path: "/wish", element: <Wish /> },
      { path: "/hated", element: <Hated /> },
      { path: "/busca", element: <Search /> },
    ],
  },
]);

export default router;
