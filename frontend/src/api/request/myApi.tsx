import axios from "axios";
import { apiUrl } from "../routes";
import { AllApiModels } from "../models";
import { RoutesType } from "../types/routesType";

const myApi = () => {
  const getAll = async (route: RoutesType) => {
    const reponse = await axios.get(`${apiUrl}/api/${route}/all`);
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
