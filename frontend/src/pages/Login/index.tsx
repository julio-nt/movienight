import { useState } from "react";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title";
import IText from "../../components/Inputs/IText";
import ErrorMessage from "../../components/ErrorMessage";
import login from "../../api/request/login";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async () => {
    setError(undefined);
    try {
      const isLogged = await login(username, password);

      if (isLogged) {
        const userToSave = {
          id: isLogged.user.id,
          name: isLogged.user.name,
          username: isLogged.user.username,
        };

        localStorage.setItem("user", JSON.stringify(userToSave));
        navigate("/");
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
          handleLogin();
        }}
        className={`mt-32 border border-1 p-6 flex flex-col gap-4 text-center justify-center ${error && "border-red-500"}`}
      >
        <Title title="Movie Night" />
        <h3 className="font-medium text-lg text-white text-center">Login</h3>
        <IText id="username" placeholder="Usuário" value={username} setValue={setUsername} />
        <IText id="password" type="password" placeholder="Senha" value={password} setValue={setPassword} />
        <Button label="Entrar" type="submit" className="bg-green-600 p-2 text-gray-300 hover:bg-green-500 w-[196.8px] m-auto" />

        {error && <ErrorMessage message={error} className="mt-[-.5rem]" />}

        <p className="max-w[197.5px] text-gray-400">
          Não possui conta?{" "}
          <Link to={"/cadastro"} className="font-bold hover:text-gray-300">
            registre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
