import { useEffect } from "react";

const Home = () => {
  const loadData = async () => {};

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <p className="">home page</p>
    </div>
  );
};

export default Home;
