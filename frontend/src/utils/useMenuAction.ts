import { Dispatch, SetStateAction } from "react";
import { MovieApiModel } from "../api/models";
import { CategoryTypes } from "../types/CategoryTypes";
import myApi from "../api/request/myApi";

type Props = {
  type: CategoryTypes;
  id: number;
  data: MovieApiModel[];
  setData: Dispatch<SetStateAction<MovieApiModel[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  show: any;
};

const useMenuAction = async ({ type, id, data, setData, setLoading, show }: Props) => {
  const { getById, updateItem } = myApi();
  setLoading(true);
  try {
    const dataToUpdate: MovieApiModel = await getById("movie", id);
    const updatedData: MovieApiModel = {
      ...dataToUpdate,
      [type]: !dataToUpdate[type],
    };

    await updateItem("movie", updatedData, id);
    const newDataArr = data.filter((d) => d.id !== id);
    setData([...newDataArr, updatedData]);

    let toast_msg = "";

    if (type === "favorite") toast_msg = "Favoritado";
    if (type === "dislike") toast_msg = "Definido como não gostei";
    if (type === "wish_to_watch") toast_msg = "Adicionado à lista de desejos";
    if (type === "hate") toast_msg = "Destruído com sucesso";
    if (type === "like") toast_msg = "Definido como gostei";

    show("success", `${toast_msg} com sucesso`);
  } catch (error) {
    console.error("Erro ao adicionar item: ", error);
    show("error", `Algo deu errado`);
  } finally {
    // setTimeout(() => setLoading(false), 5000);
    setLoading(false)
  }
};

export default useMenuAction;
