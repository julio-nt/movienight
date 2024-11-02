import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../components/Inputs/InputGroup";
import useWidth from "../../utils/useWidth";

const Navbar = () => {
  const navigate = useNavigate();
  const { width } = useWidth();

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
      url: "/favorites",
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

  const start = (
    <h2 className="text-2xl font-bold mr-[0.5rem] cursor-pointer" onClick={() => navigate("/")}>
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
      <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
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
        </form>
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
      </div>
    </div>
  );

  return <div className="card bg-slate-800">{width < 597 ? <Menubar model={items} end={mobile} /> : <Menubar model={items} start={start} end={end} />}</div>;
};

export default Navbar;
