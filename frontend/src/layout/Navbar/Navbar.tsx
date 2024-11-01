import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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
    console.log(input);
    if (input) {
      navigate(`/busca?p=${input}`);
    }
  };

  const start = <h2 className="text-2xl font-bold mr-[0.5rem]">Movie Night</h2>;
  const end = (
    <div className="flex align-items-center gap-2 bg-slate-800 ">
      <InputText placeholder="Buscar" type="text" className="w-8rem sm:w-auto pl-2" value={input} onChange={(e) => setInput(e.target.value)} />
      <Button label="ir" onClick={handleSearch} />
      <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
    </div>
  );

  return (
    <div className="card bg-slate-800">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default Navbar;
