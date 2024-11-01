import search from "./request/search";

const useApi = () => {
  const useSearch = async (query: string) => {
    return await search(query);
  };

  const useImage = async (id: string) => {
    return await search(id);
  };

  return { useSearch, useImage };
};

export default useApi;
