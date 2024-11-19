import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkIsLogged = async () => {
    const localUser = localStorage.getItem("user");
    const userJson = JSON.parse(localUser!);

    if (!userJson) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkIsLogged();
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <div className="flex justify-center">
        <div className="max-w-[1920px] min-w-full pl-4 pr-4 max-[596px]:mt-24 max-[960px]:mt-16 min-[960px]:mt-32 min-[1248px]:mt-20  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
