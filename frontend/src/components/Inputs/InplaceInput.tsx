import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { InputText } from "primereact/inputtext";

type Props = {
  value: any;
  setValue: any;
  label: string;
  placeholder?: string;
};

const InplaceInput = ({ value, setValue, label, placeholder = "" }: Props) => {
  return (
    <Inplace closable>
      <InplaceDisplay>{label}</InplaceDisplay>
      <InplaceContent>
        <InputText value={value} onChange={(e) => setValue(e.target.value)} autoFocus placeholder={placeholder} className="pl-2 pr-2 p-1" />
      </InplaceContent>
    </Inplace>
  );
};

export default InplaceInput;
