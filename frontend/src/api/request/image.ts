import axios from "axios";

const image = async (id: string) => {
  const token = import.meta.env.VITE_THE_MOVIE_DB_API_TOKEN;
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`https://image.tmdb.org/t/p/original/${id}`, headers);

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar dados: ", error);
    throw Error;
  }
};

export default image;
