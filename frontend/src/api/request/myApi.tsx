import axios from "axios";
import { apiUrl } from "../routes";
import { AllApiModels } from "../models";
import { RoutesType } from "../types/routesType";

const myApi = () => {
  const getAll = async (route: RoutesType) => {
    const localUser = localStorage.getItem("user");
    const jsonUser = JSON.parse(localUser!);

    const header = {
      headers: {
        user_fk: jsonUser?.id,
      },
    };
    const reponse = await axios.get(`${apiUrl}/api/${route}/all`, header);
    return reponse.data;
  };

  const getById = async (route: RoutesType, _id: string) => {
    const reponse = await axios.get(`${apiUrl}/api/${route}/${_id}`);

    return reponse.data;
  };

  const postItem = async (route: RoutesType, data: AllApiModels) => {
    const reponse = await axios.post(`${apiUrl}/api/${route}`, data);

    return reponse.data;
  };

  return { getAll, getById, postItem };
};

export default myApi;
