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

  const getById = async (route: RoutesType, _id: number) => {
    const localUser = localStorage.getItem("user");
    const jsonUser = JSON.parse(localUser!);

    const header = {
      headers: {
        user_fk: jsonUser?.id,
      },
    };

    if (route === `movie`) {
      const reponse = await axios.get(`${apiUrl}/api/${route}/${_id}`, header);
      return reponse.data;
    }
    const reponse = await axios.get(`${apiUrl}/api/${route}/${_id}`);

    return reponse.data;
  };

  const getMovieByType = async (route: RoutesType, type: "favorite" | "liked" | "disliked" | "wish" | "hate") => {
    const localUser = localStorage.getItem("user");
    const jsonUser = JSON.parse(localUser!);

    const header = {
      headers: {
        user_fk: jsonUser?.id,
      },
    };

    const reponse = await axios.get(`${apiUrl}/api/${route}/all/${type}`, header);

    return reponse.data;
  };

  const postItem = async (route: RoutesType, data: AllApiModels) => {
    const reponse = await axios.post(`${apiUrl}/api/${route}`, data);

    return reponse.data;
  };

  const updateItem = async (route: RoutesType, data: AllApiModels, _id: number) => {
    const localUser = localStorage.getItem("user");
    const jsonUser = JSON.parse(localUser!);

    const header = {
      headers: {
        user_fk: jsonUser?.id,
      },
    };

    const reponse = await axios.put(`${apiUrl}/api/${route}/${_id}`, data, header);

    return reponse.data;
  };

  return { getAll, getById, getMovieByType, postItem, updateItem };
};

export default myApi;
