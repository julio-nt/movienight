import { useState } from "react";
import Title from "../../components/Title/Title";
import IText from "../../components/Inputs/IText";
import { Button } from "primereact/button";
import ErrorMessage from "../../components/ErrorMessage";
import register from "../../api/request/register";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [error, setError] = useState<string | undefined>(undefined);

  const handleRegister = async () => {
    try {
      if (password !== passwordConfirm) {
        setError("As duas senhas são diferentes");
        return;
      }

      const cadastro = await register(name, username, password);

      if (cadastro) {
        navigate("/login");
      }
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className={`mt-32 border border-1 p-6 flex flex-col gap-4 text-center justify-center ${error && "border-red-500"}`}
      >
        <Title title="Movie Night" />
        <h3 className="font-medium text-lg text-white text-center">Criando Nova Conta</h3>
        <IText id="name" placeholder="Nome" value={name} setValue={setName} />
        <IText id="username" placeholder="Usuário" value={username} setValue={setUsername} />
        <IText id="password" type="password" placeholder="Senha" value={password} setValue={setPassword} />
        <IText id="passwordConfirm" type="password" placeholder="Confirmar Senha" value={passwordConfirm} setValue={setPasswordConfirm} />
        <Button label="Cadastrar" type="submit" className="bg-green-600 p-2 text-gray-300 hover:bg-green-500 w-[196.8px] m-auto" />
        <Link to={"/login"} className="font-bold text-gray-400 hover:text-gray-300">
          Voltar
        </Link>

        {error && <ErrorMessage message={error} className="mt-[-.5rem]" />}
      </form>
    </div>
  );
};
export default Register;
