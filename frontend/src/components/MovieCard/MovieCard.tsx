import { Chip } from "primereact/chip";
import { MovieApiModel } from "../../api/models";
import { imageRoute } from "../../api/routes";
import { CategoryTypes } from "../../types/CategoryTypes";
import myApi from "../../api/request/myApi";
import { ContextMenu } from "primereact/contextmenu";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Toast } from "primereact/toast";

type Props = {
  data: MovieApiModel[];
  setMovie?: any;
  currentScreenType?: CategoryTypes;
  hasChip?: boolean;
  hasMenu?: boolean;
};

const MovieCard = ({ data, setMovie, currentScreenType, hasChip, hasMenu = true }: Props) => {
  const { updateItem } = myApi();

  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<any>();
  const [lastSelectedId, setLastSelectedId] = useState<any>();

  const cm = useRef<any>(null);
  const toast = useRef<any>(null);

  const handleRemove = async (type: CategoryTypes, item: MovieApiModel) => {
    setLoading(true);
    try {
      const updatedData: MovieApiModel = {
        [type]: false,
      };

      await updateItem("movie", updatedData, item.id!);

      if (type === currentScreenType) {
        setMovie(data.filter((movie) => movie.id !== item.id));
      }

      show("success", `Removido com sucesso`);
    } catch (error) {
      console.error("Erro ao remover item: ", error);
      show("error", `Algo deu errado`);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (type: CategoryTypes, id: number) => {
    setLoading(true);
    try {
      const updatedData: MovieApiModel = {
        [type]: true,
      };

      await updateItem("movie", updatedData, id);
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
      setLoading(false);
    }
  };

  const show = (color: "info" | "success" | "warn" | "error" | "secondary", text: string) => {
    toast.current?.show({ severity: color, detail: text });
  };

  const items = [
    {
      label: "Detalhes",
      icon: <Icon icon="icon-park-outline:doc-detail" className="me-1" />,
      shortcut: "⌘+D",
    },
    {
      separator: true,
    },
    {
      label: "Adiconar",
      items: [
        {
          label: "Favorito",
          icon: <Icon icon="wpf:like" />,
          command: () => {
            handleAdd("favorite", selectedId);
          },
        },
        {
          label: "Quero Assistir",
          icon: <Icon icon="solar:flag-bold" />,
          command: () => {
            handleAdd("wish_to_watch", selectedId);
          },
        },
        {
          label: "Gostei",
          icon: <Icon icon="mdi:like" />,
          command: () => {
            handleAdd("like", selectedId);
          },
        },
        {
          label: "Não Gostei",
          icon: <Icon icon="mdi:dislike" />,
          command: () => {
            handleAdd("dislike", selectedId);
          },
        },
        {
          label: "Odiei",
          icon: <Icon icon="tabler:trash-filled" />,
          command: () => {
            handleAdd("hate", lastSelectedId);
          },
        },
      ],
    },
  ];

  const onRightClick = (event: any, id: any) => {
    console.log(id);
    if (cm.current) {
      setSelectedId(id);
      setLastSelectedId(id);
      cm.current.show(event);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 ">
      <Toast ref={toast} position="top-center" />
      {hasMenu && <ContextMenu model={items} ref={cm} breakpoint="767px" onHide={() => setSelectedId(undefined)} />}
      {data.map((item) => {
        return (
          <div key={item.id} className="flex flex-col gap-4 max-w-[250px]" onContextMenu={(e) => onRightClick(e, item.id)}>
            <img src={`${imageRoute}${item.image_tmdb}`} className="max-w-[250px] max-h-[375px]" width={250} height={250} />
            <div className="space-y-1">
              <p className="text-center">{item.name}</p>
              <p>Nota: {item.vote_average}</p>
              {item.release_date && <p>Lançamento: {new Date(item.release_date).toLocaleDateString()}</p>}
              {hasChip && (
                <div className="flex gap-2 flex-wrap">
                  {item.favorite && <Chip label="Favorito" removable onRemove={() => handleRemove("favorite", item)} icon={<Icon icon="wpf:like" />} removeIcon={<Icon icon="carbon:close-outline" className="hover:text-red-500 cursor-pointer ms-1" />} />}
                  {item.wish_to_watch && (
                    <Chip label="Quero Assistir" removable onRemove={() => handleRemove("wish_to_watch", item)} icon={<Icon icon="solar:flag-bold" />} removeIcon={<Icon icon="carbon:close-outline" className="hover:text-red-500 cursor-pointer ms-1" />} />
                  )}
                  {item.like && <Chip label="Gostei" removable onRemove={() => handleRemove("like", item)} icon={<Icon icon="mdi:like" />} removeIcon={<Icon icon="carbon:close-outline" className="hover:text-red-500 cursor-pointer ms-1" />} />}
                  {item.dislike && (
                    <Chip label="Não Gostei" removable onRemove={() => handleRemove("dislike", item)} icon={<Icon icon="mdi:dislike" />} removeIcon={<Icon icon="carbon:close-outline" className="hover:text-red-500 cursor-pointer ms-1" />} />
                  )}
                  {item.hate && <Chip label="Odiei" removable onRemove={() => handleRemove("hate", item)} icon={<Icon icon="tabler:trash-filled" />} removeIcon={<Icon icon="carbon:close-outline" className="hover:text-red-500 cursor-pointer ms-1" />} />}
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
