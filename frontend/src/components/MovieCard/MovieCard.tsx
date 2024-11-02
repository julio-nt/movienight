import { MovieApiModel } from "../../api/models";
import { imageRoute } from "../../api/routes";

type Props = {
  data: MovieApiModel[];
};

const MovieCard = ({ data }: Props) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <img src={`${imageRoute}${item.image_tmdb}`} className="max-w-[250px] max-h-[375px]" width={250} height={250} />
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;
