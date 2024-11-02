import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction } from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const InputGroup = ({ value, setValue }: Props) => {
  return (
    <div className="p-inputgroup flex-1">
      <InputText placeholder="Buscar" type="text" className="w-8rem sm:w-auto pl-2 p-1 rounded-r-none" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button type="submit" className="bg-sky-500 rounded-l-none">
        <Icon icon={"material-symbols:search"} fontSize={32} />
      </Button>
    </div>
  );
};

export default InputGroup;
