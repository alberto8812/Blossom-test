import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useFavoritesCharacterStore } from "../../../../../../shared/presentation/store";

interface Props {
  name?: string;
  species?: string;
  img?: string;
  id?: string;
  favorite?: boolean;
  status?: string;
  origin?: string;
  isActive?: boolean;
}

export const ProfileCard = ({
  name = "",
  species = "Alien",
  img,
  id = "",
  favorite = false,
  status = "",
  origin = "",
  isActive = false,
}: Props) => {
  const addFavoriteAndremoVe = useFavoritesCharacterStore(
    (state) => state.addFavoriteAndremoVe,
  );
  return (
    <div
      className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-150 ${
        isActive
          ? "bg-[var(--accent-light)] border-l-[3px] border-l-[var(--accent)]"
          : "hover:bg-[var(--surface-hover)]"
      }`}
    >
      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <img
          className="aspect-square h-full w-full object-cover"
          src={`${img && img !== "" ? img : "./img/profile.jpg"}`}
          alt={name}
        />
      </span>
      <div className="flex-1 min-w-0 pl-3">
        <p
          className="text-sm font-semibold truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {name}
        </p>
        <p
          className="text-xs mt-0.5 truncate"
          style={{ color: "var(--text-secondary)" }}
        >
          {species}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addFavoriteAndremoVe({
            name,
            species: species,
            img: `${img && img !== "" ? img : "./img/profile.jpg"}`,
            id,
            status,
            origin,
          });
        }}
        className={`flex items-center justify-center h-8 w-8 shrink-0 rounded-full ${
          favorite
            ? "text-[var(--accent-heart)]"
            : "text-gray-300 hover:text-gray-400"
        } hover:bg-gray-100`}
      >
        {favorite ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
      </button>
    </div>
  );
};
