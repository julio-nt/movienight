import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <div className="flex justify-center">
        <div className="max-w-[1920px] min-w-full pl-4 pr-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
