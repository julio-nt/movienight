import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  type?: "text" | "password";
  setValue: Dispatch<SetStateAction<string>>;
  onChange?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
};

const IText = ({ id, label, placeholder, type = "text", value, setValue, onChange, disabled, autoFocus }: Props) => {
  const handleChange = (e: any) => {
    setValue(e.target.value);
    onChange && onChange();
  };

  return (
    <FloatLabel className={`${label && "mt-4"}`}>
      <InputText placeholder={placeholder} id={id} type={type} value={value} onChange={handleChange} className="pl-2 pr-2 p-1" disabled={disabled} autoFocus={autoFocus} />
      {label && (
        <label htmlFor={id} className="float-label">
          {label}
        </label>
      )}
    </FloatLabel>
  );
};

export default IText;
