import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes/routes.tsx";

import "./layout/global.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={browserRouter} />
    </PrimeReactProvider>
  </StrictMode>
);
