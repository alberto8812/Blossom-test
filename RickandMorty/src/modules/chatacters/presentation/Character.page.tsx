import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useFindById, useDeleteData } from "../../../shared/presentation/hooks/use-SelectPetition-module";
import { useFavoritesCharacterStore } from "../../../shared/presentation/store";
import type { CharacterDB } from "../domain/entity/character.interface.db";
import { getAllCharactersById } from "../api/get-characters-by-id";
import { deleteCharacter } from "../api/delete-character";
import { Inputfieled } from "./components/ui/input/Inputfieled";
import { Loading } from "../../../components/Loading";
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal";

export const CharacterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: character, isLoading } = useFindById<CharacterDB>(
    ["GET_CHARACTER_BY_ID", id],
    () => getAllCharactersById(id!),
    !!id,
  );

  const deleteMutation = useDeleteData(
    ["GET_ALL_CHARACTERS"],
    deleteCharacter,
  );

  const favorites = useFavoritesCharacterStore((state) => state.favorites);
  const addFavoriteAndremoVe = useFavoritesCharacterStore(
    (state) => state.addFavoriteAndremoVe,
  );

  if (!id) {
    return (
      <div className="hidden lg:flex items-center justify-center h-full">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Select a character to see details
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading text="Loading character" />;
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Character not found
        </p>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleToggleFavorite = () => {
    addFavoriteAndremoVe({
      id: character.id,
      name: character.name,
      species: character.species,
      img: character.img,
      status: character.status,
      origin: character.origin,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(character.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting character:", error);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className=" mx-auto py-6 lg:py-8 px-5 lg:px-6">
      {/* Mobile back button */}

      <div className="flex items-end gap-3 mb-2 pt-5">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full overflow-hidden shrink-0 border"
            style={{ borderColor: "var(--border-light)" }}
          >
            <img
              src={character.img || "./img/profile.jpg"}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -right-1 -bottom-0.5 bg-white rounded-full p-0.5">
            <button
              onClick={handleToggleFavorite}
              className={`mb-1 ${
                isFavorite ? "text-[var(--accent-heart)]" : "text-gray-300"
              } hover:text-[var(--accent-heart)]`}
            >
              {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {character.name}
        </h1>
        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={deleteMutation.isPending}
          className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete character"
        >
          <FaTrash size={18} />
        </button>
      </div>

      <div className="space-y-0">
        <div
          className="py-4"
          style={{ borderBottom: "1px solid var(--border-light)" }}
        >
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Specie
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {character.species || "Unknown"}
          </p>
        </div>

        <div
          className="py-4"
          style={{ borderBottom: "1px solid var(--border-light)" }}
        >
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Status
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {character.status || "Unknown"}
          </p>
        </div>

        <div className="py-4">
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Origin
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {character.origin || "Unknown"}
          </p>
        </div>
        <div className="py-4">
          <Inputfieled
            key={character.id}
            comment={character.comment}
            id={character.id}
          />
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Character"
        message="Are you sure you want to delete this character? This action cannot be undone."
        itemName={character.name}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
