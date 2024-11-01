// routes/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/index.tsx";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Liked from "../pages/Liked";
import Recommended from "../pages/Recommended";
import Search from "../pages/Search";

const router = createBrowserRouter([
  {
    element: <Layout />, // Envolva o layout aqui
    children: [
      { path: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/recommended", element: <Recommended /> },
      { path: "/liked", element: <Liked /> },
      { path: "/disliked", element: <Home /> }, // Atualize as rotas conforme necessário
      { path: "/hated", element: <Home /> },
      { path: "/busca", element: <Search /> },
    ],
  },
]);

export default router;
