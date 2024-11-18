import { Chip } from "primereact/chip";
import { MovieApiModel } from "../../api/models";
import { imageRoute } from "../../api/routes";
import { CategoryTypes } from "../../types/CategoryTypes";
import myApi from "../../api/request/myApi";

type Props = {
  data: MovieApiModel[];
  setMovie?: any;
  currentScreenType?: CategoryTypes;
  hasChip?: boolean;
};

const MovieCard = ({ data, setMovie, currentScreenType, hasChip }: Props) => {
  const { updateItem } = myApi();
  const handleRemove = async (type: CategoryTypes, item: MovieApiModel) => {
    const updatedData: MovieApiModel = {
      [type]: false,
    };

    await updateItem("movie", updatedData, item.id!);

    if (type === currentScreenType) {
      setMovie(data.filter((movie) => movie.id !== item.id));
    }
  };

  return (
    <div className="flex flex-wrap gap-4 ">
      {data.map((item) => {
        return (
          <div key={item.id} className="flex flex-col gap-4 ">
            <img src={`${imageRoute}${item.image_tmdb}`} className="max-w-[250px] max-h-[375px]" width={250} height={250} />
            <div className="space-y-1">
              <p className="text-center">{item.name}</p>
              <p>Nota: {item.vote_average}</p>
              {item.release_date && <p>Lançamento: {new Date(item.release_date).toLocaleDateString()}</p>}
              {hasChip && (
                <div className="flex gap-2 flex-wrap">
                  {item.favorite && <Chip label="Favorito" removable onRemove={() => handleRemove("favorite", item)} />}
                  {item.wish_to_watch && <Chip label="Quero Assistir" removable onRemove={() => handleRemove("wish_to_watch", item)} />}
                  {item.like && <Chip label="Gostei" removable onRemove={() => handleRemove("like", item)} />}
                  {item.dislike && <Chip label="Não Gostei" removable onRemove={() => handleRemove("dislike", item)} />}
                  {item.hate && <Chip label="Odiei" removable onRemove={() => handleRemove("hate", item)} />}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;
