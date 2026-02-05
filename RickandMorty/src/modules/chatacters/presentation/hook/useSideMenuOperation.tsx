import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  defaultFilters,
  getActiveFilterCount,
  type FilterState,
} from "../components/ui/sideMenu/ModalFilterSidebar";
import {
  useFavoritesCharacterStore,
  useFilterSharestore,
} from "../../../../shared/presentation/store";
import { useFindAll } from "../../../../shared/presentation/hooks/use-SelectPetition-module";
import type { CharacterDB } from "../../domain/entity/character.interface.db";
import { getAllCharacters } from "../../api/get-all-characters";
import type { OriginDB } from "../../../origin/domain/entity/origin.interface";
import type { SpecieDB } from "../../../gender/domain/entity/specie.interface";
import { getAllOrigin } from "../../../origin/api/get-all-origin";
import { getAllGender } from "../../../gender/api/get-all-gender";

export const useSideMenuOperation = () => {
  const { id: activeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const nameFilter = useFilterSharestore((state) => state.name);
  const characterFilter = useFilterSharestore((state) => state.characterFilter);
  const favoritesCharacter = useFavoritesCharacterStore(
    (state) => state.favorites,
  );
  const favoritesCountCharacter = useFavoritesCharacterStore(
    (state) => state.countFavorites,
  );

  const { data: characters, isLoading } = useFindAll<CharacterDB>(
    [
      "GET_ALL_CHARACTER",
      JSON.stringify(characterFilter),
      JSON.stringify(nameFilter),
    ],
    () => getAllCharacters({ ...characterFilter, ...nameFilter }),
  );

  const { data: origins, isLoading: isLoadingOrigins } = useFindAll<OriginDB>(
    ["GET_ALL_ORIGIN"],
    getAllOrigin,
  );

  const { data: genders, isLoading: isLoadingGenders } = useFindAll<SpecieDB>(
    ["GET_ALL_GENDER"],
    getAllGender,
  );

  const activeFilterCount = getActiveFilterCount(filters);
  return {
    activeId,
    isOpen,
    setIsOpen,
    isOpenFilter,
    setIsOpenFilter,
    filters,
    setFilters,
    isAdvancedSearch,
    setIsAdvancedSearch,
    nameFilter,
    characterFilter,
    favoritesCharacter,
    favoritesCountCharacter,
    characters,
    isLoading,
    origins,
    isLoadingOrigins,
    genders,
    isLoadingGenders,
    activeFilterCount,
  };
};
