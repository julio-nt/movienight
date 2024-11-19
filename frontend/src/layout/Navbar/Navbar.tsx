import { Menubar } from "primereact/menubar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWidth from "../../utils/useWidth";
// import InplaceInput from "../../components/Inputs/InplaceInput";
import InputGroup from "../../components/Inputs/InputGroup";

const Navbar = () => {
  const navigate = useNavigate();
  const { width } = useWidth();

  const localUser = localStorage.getItem("user");
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const jsonUser = JSON.parse(localUser!);
    setUser(jsonUser);
  }, []);

  const [input, setInput] = useState("");
  const items: any[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/",
    },
    {
      label: "Meus Favoritos",
      icon: "pi pi-star",
      url: "/favorites",
    },
    {
      label: "Quero Assistir",
      icon: "pi pi-star",
      url: "/wish",
    },
    {
      label: "Recomendados",
      icon: "pi pi-star",
      url: "/recommended",
    },
    {
      label: "Mais",
      icon: "pi pi-star",
      items: [
        {
          label: "Gostei",
          icon: "pi pi-star",
          url: "/liked",
        },
        {
          label: "Não Gostei",
          icon: "pi pi-star",
          url: "/disliked",
        },
        {
          label: "Odiei",
          icon: "pi pi-star",
          url: "/hated",
        },
      ],
    },
  ];

  const handleSearch = async () => {
    if (input) {
      navigate(`/busca?p=${input}`);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const start = (
    <h2 className="text-2xl font-bold mr-[0.5rem] cursor-pointer pl-2" onClick={() => navigate("/")}>
      Movie Night
    </h2>
  );
  const end = (
    <div className="flex align-items-center gap-24 bg-slate-800 pl-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <InputGroup value={input} setValue={setInput} />
      </form>
      <div className="min-w-[100px] cursor-pointer" onClick={handleLogout}>
        <p>Olá {user?.name}</p>
      </div>
    </div>
  );

  const mobile = (
    <div className="ml-4">
      <h2 className="text-2xl font-bold mr-[0.5rem] cursor-pointer" onClick={() => navigate("/")}>
        Movie Night
      </h2>
      <div className={`flex align-items-center ${width >= 457 ? "gap-24" : "gap-4"} bg-slate-800 ${width < 597 && "pl-0"}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputGroup value={input} setValue={setInput} />
          {/* <InplaceInput value={input} setValue={setInput} label="Buscar Filme" /> */}
        </form>
        <div className="min-w-[80px]">
          <p>Olá {user?.name}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card bg-slate-800">
      <Menubar className="fixed w-full" model={items} start={width < 597 ? undefined : start} end={width < 597 ? mobile : end} />
    </div>
  );
};

export default Navbar;
