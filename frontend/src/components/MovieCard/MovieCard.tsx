import { MovieApiModel } from "../../api/models";
import { imageRoute } from "../../api/routes";
import { CategoryTypes } from "../../types/CategoryTypes";
import { ContextMenu } from "primereact/contextmenu";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Toast } from "primereact/toast";
import useMenuAction from "../../utils/useMenuAction";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";

type Props = {
  data: MovieApiModel[];
  setData?: any;
  hasChip?: boolean;
  hasMenu?: boolean;
};

const MovieCard = ({ data, setData, hasMenu = true }: Props) => {
  const [_loading, setLoading] = useState(false);
  const [dataKey, setDataKey] = useState(0);
  const [selectedId, setSelectedId] = useState<any>();
  const [lastSelectedId, setLastSelectedId] = useState<any>();

  const cm = useRef<any>(null);
  const toast = useRef<any>(null);

  const handleAction = async (type: CategoryTypes, id: number) => {
    await useMenuAction({ id, data, setData, setLoading, show, type });
  };

  useEffect(() => {
    console.log(data);
    setDataKey((prevKey) => prevKey + 1);
  }, [data]);

  const show = (color: "info" | "success" | "warn" | "error" | "secondary", text: string) => {
    toast.current?.show({ severity: color, detail: text });
  };

  const items = [
    {
      label: "Detalhes",
      icon: <Icon icon="icon-park-outline:doc-detail" className="me-1" />,
      shortcut: "⌘+D",
      disabled: true,
    },
    {
      separator: true,
    },
    {
      label: "Add / Remove",
      items: [
        {
          label: "Favorito",
          icon: <Icon icon="wpf:like" />,
          command: () => {
            handleAction("favorite", selectedId);
          },
        },
        {
          label: "Quero Assistir",
          icon: <Icon icon="solar:flag-bold" />,
          command: () => {
            handleAction("wish_to_watch", selectedId);
          },
        },
        {
          label: "Gostei",
          icon: <Icon icon="mdi:like" />,
          command: () => {
            handleAction("like", selectedId);
          },
        },
        {
          label: "Não Gostei",
          icon: <Icon icon="mdi:dislike" />,
          command: () => {
            handleAction("dislike", selectedId);
          },
        },
        {
          label: "Odiei",
          icon: <Icon icon="tabler:trash-filled" />,
          command: () => {
            handleAction("hate", lastSelectedId);
          },
        },
      ],
    },
  ];

  const items2 = [
    {
      label: "Favorito",
      icon: <Icon icon="wpf:like" />,
      command: () => {
        handleAction("favorite", selectedId);
      },
    },
    {
      label: "Quero Assistir",
      icon: <Icon icon="solar:flag-bold" />,
      command: () => {
        handleAction("wish_to_watch", selectedId);
      },
    },
    {
      label: "Gostei",
      icon: <Icon icon="mdi:like" />,
      command: () => {
        handleAction("like", selectedId);
      },
    },

    {
      label: "Não Gostei",
      icon: <Icon icon="mdi:dislike" />,
      command: () => {
        handleAction("dislike", selectedId);
      },
    },
    {
      label: "Odiei",
      icon: <Icon icon="tabler:trash-filled" />,
      command: () => {
        handleAction("hate", lastSelectedId);
      },
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

  // if (loading) {
  //   return <p>Carregando</p>;
  // }

  return (
    <div className="flex flex-wrap gap-4 " key={dataKey}>
      <Toast ref={toast} position="top-center" />
      {hasMenu && <ContextMenu model={items} ref={cm} breakpoint="767px" onHide={() => setSelectedId(undefined)} />}
      {data.map((item) => {
        return (
          <div key={item.id} className="flex flex-col gap-4 max-w-[250px] relative" onContextMenu={(e) => onRightClick(e, item.id)}>
            <Tooltip target=".speeddial-bottom-left .p-speeddial-action" />
            <SpeedDial
              model={items2}
              type="semi-circle"
              direction="left"
              transitionDelay={80}
              className="absolute right-0 top-[385px] speeddial-bottom-left"
              buttonClassName="bg-slate-500 hover:bg-slate-600 w-[2rem] h-[2rem]"
              onClick={() => setSelectedId(item.id)}
            />
            <img src={`${imageRoute}${item.image_tmdb}`} className="max-w-[250px] max-h-[375px]" width={250} height={250} />
            <div className="space-y-1">
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
