import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelectPetitionModule } from "../../../../../shared/presentation/hooks/use-SelectPetition-module";
import { getAllCharacters } from "../../../api/get-all-characters";
import { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { SearchSideMenu } from "../../../../../components/SearchSideMenu";
import { Squeleton } from "../Squeleton";
import { Accordion } from "../../../../../components/Accordion";
import {
  useFavoritesCharacterStore,
  useFilterSharestore,
} from "../../../../../shared/presentation/store";
import type { CharacterDB } from "../../../domain/entity/character.interface.db";
import { ProfileCard } from "../cards/ProfileCard";
import {
  ModalFilterSidebar,
  defaultFilters,
  getActiveFilterCount,
  type FilterState,
} from "./ModalFilterSidebar";
import { getAllOrigin } from "../../../../origin/api/get-all-origin";
import { getAllGender } from "../../../../gender/api/get-all-gender";

export const SideMenu = () => {
  const navigate = useNavigate();
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

  const { data: characters, isLoading } = useSelectPetitionModule(
    [
      "GET_ALL_CHARACTER",
      JSON.stringify(characterFilter),
      JSON.stringify(nameFilter),
    ],
    {
      findAll: async () => {
        const characters = await getAllCharacters({
          ...characterFilter,
          ...nameFilter,
        });
        return { data: characters };
      },
    },
  );
  const { data: origins, isLoading: isLoadingOrigins } =
    useSelectPetitionModule(["GET_ALL_ORIGIN"], {
      findAll: async () => {
        const origins = await getAllOrigin();
        return { data: origins };
      },
    });
  const { data: genders, isLoading: isLoadingGenders } =
    useSelectPetitionModule(["GET_ALL_GENDER"], {
      findAll: async () => {
        const genders = await getAllGender();
        return { data: genders };
      },
    });

  const activeFilterCount = getActiveFilterCount(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenFilter = () => {
    setIsOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setIsOpenFilter(false);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    const count = getActiveFilterCount(newFilters);
    if (count > 0) {
      setIsAdvancedSearch(true);
    }
  };

  const handleDoneAdvancedSearch = () => {
    setIsAdvancedSearch(false);
    setFilters(defaultFilters);
  };

  return (
    <div className="flex">
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className={`${
          isOpen ? "hidden" : "block"
        } p-4 text-[var(--accent)] lg:hidden absolute z-10`}
      >
        <FaArrowLeftLong size={24} />
      </button>

      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block w-screen lg:w-[360px] h-screen xs:fixed border-r shrink-0`}
        style={{
          backgroundColor: "var(--surface-sidebar)",
          borderColor: "var(--border-light)",
        }}
      >
        <div className="p-5 space-y-5 h-full flex flex-col">
          {/* Mobile close button */}
          <div
            onClick={toggleSidebar}
            className={`${
              isOpen ? "block" : "hidden"
            } lg:hidden text-[var(--accent)] flex justify-end cursor-pointer`}
          >
            <IoIosCloseCircleOutline size={24} />
          </div>

          {/* Header: normal or advanced search mode */}
          {isAdvancedSearch ? (
            <div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleDoneAdvancedSearch}
                  className="text-[var(--accent)] lg:hidden"
                >
                  <IoArrowBack size={20} />
                </button>
                <span
                  className="text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Advanced search
                </span>
                <button
                  onClick={handleDoneAdvancedSearch}
                  className="text-sm font-medium text-[var(--accent)]"
                >
                  Done
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                {activeFilterCount > 0 && (
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-md"
                    style={{
                      color: "var(--accent)",
                      backgroundColor: "var(--accent-light)",
                    }}
                  >
                    {activeFilterCount} Filter{activeFilterCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Rick and Morty list
            </h1>
          )}

          {/* Search bar with filter toggle */}
          {!isAdvancedSearch && (
            <div className="relative">
              <SearchSideMenu
                handleFilterModal={handleOpenFilter}
                isOpenFilter={isOpenFilter}
              />
              {/* Desktop filter dropdown */}
              {isOpenFilter && (
                <div className="hidden lg:block">
                  <ModalFilterSidebar
                    origins={origins?.data || []}
                    genders={genders?.data || []}
                    onClose={handleCloseFilter}
                    onApply={handleApplyFilters}
                    currentFilters={filters}
                    isMobile={false}
                  />
                </div>
              )}
            </div>
          )}

          {/* Mobile full-screen filter */}
          {isOpenFilter && (
            <div className="lg:hidden">
              <ModalFilterSidebar
                onClose={handleCloseFilter}
                onApply={handleApplyFilters}
                currentFilters={filters}
                isMobile={true}
                origins={origins?.data || []}
                genders={genders?.data || []}
              />
            </div>
          )}

          {/* Character lists */}
          {isLoading ? (
            <Squeleton />
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              <Accordion
                title={`STARRED CHARACTERS (${favoritesCountCharacter})`}
              >
                {favoritesCharacter.map((item: CharacterDB) => (
                  <NavLink
                    to={`/dashboard/characters/${item.id}`}
                    key={item.id}
                    className="block"
                  >
                    <ProfileCard
                      id={item.id}
                      name={item.name}
                      species={item.species}
                      img={item.img}
                      favorite={true}
                      isActive={activeId === item.id}
                    />
                  </NavLink>
                ))}
              </Accordion>

              <Accordion
                title={`CHARCTERS (${
                  (characters?.data.length ?? 0) - favoritesCountCharacter < 0
                    ? 0
                    : (characters?.data.length ?? 0) - favoritesCountCharacter
                })`}
                style="max-h-[calc(100vh-400px)]"
                initalState={true}
              >
                {characters?.data.map((item: CharacterDB) => {
                  if (favoritesCharacter?.find((fav) => fav.id === item.id)) {
                    return null;
                  }
                  return (
                    <NavLink
                      to={`/dashboard/characters/${item.id}`}
                      key={item.id}
                      className="block"
                    >
                      <ProfileCard
                        id={item.id}
                        name={item.name}
                        species={item.species}
                        img={item.img}
                        status={item.status}
                        origin={item.origin}
                        isActive={activeId === item.id}
                      />
                    </NavLink>
                  );
                })}
              </Accordion>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
