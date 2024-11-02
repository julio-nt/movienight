import { MovieApiModel } from "../../api/models";
import { imageRoute } from "../../api/routes";

type Props = {
  data: MovieApiModel[];
};

const MovieCard = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {data.map((item) => {
        return (
          <div key={item.id} className="flex flex-col gap-4 ">
            <img src={`${imageRoute}${item.image_tmdb}`} className="max-w-[250px] max-h-[375px]" width={250} height={250} />
            <div>
              <p className="text-center">{item.name}</p>
              <p>Nota: {item.vote_average}</p>
              {item.release_date && <p>Lançamento: {new Date(item.release_date).toLocaleDateString()}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;
