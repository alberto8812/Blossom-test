import { IoArrowBack } from "react-icons/io5";
import type { OriginDB } from "../../../../../origin/domain/entity/origin.interface";
import type { SpecieDB } from "../../../../../gender/domain/entity/specie.interface";
import { useFilterSharestore } from "../../../../../../shared/presentation/store";

interface Props {
  onClose: () => void;
  isMobile: boolean;
  origins: OriginDB[];
  genders: SpecieDB[];
}

export interface FilterState {
  originId: "all" | string;
  speciesId: "all" | string;
}

export const defaultFilters: FilterState = {
  originId: "all",
  speciesId: "all",
};

export const getActiveFilterCount = (filters: FilterState): number => {
  let count = 0;
  if (filters.originId !== "all") count++;
  if (filters.speciesId !== "all") count++;
  return count;
};

const PillButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap max-w-full truncate ${
      isActive
        ? "text-[var(--accent)]"
        : "border text-gray-600 hover:bg-gray-50"
    }`}
    style={
      isActive
        ? { backgroundColor: "var(--accent-light)" }
        : { borderColor: "#e5e7eb" }
    }
    title={label}
  >
    {label}
  </button>
);

export const ModalFilterSidebar = ({
  onClose,
  isMobile,
  origins,
  genders,
}: Props) => {
  const specieFilter = useFilterSharestore((state) => state.specieFilter);
  const characterFilter = useFilterSharestore((state) => state.originFilter);
  const setValidatedFieldFilter = useFilterSharestore(
    (state) => state.setValidatedFieldFilter,
  );
  const setCharacterFilter = useFilterSharestore(
    (state) => state.setOriginCharacterFilter,
  );
  const setSpecieFilter = useFilterSharestore(
    (state) => state.setSpeciesCharacterFilter,
  );

  const sendFilter = () => {
    setValidatedFieldFilter();
    onClose();
  };

  const hasFilters =
    Object.keys(specieFilter).length || Object.keys(characterFilter).length;

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div className="flex items-center px-5 py-4">
          <button onClick={onClose} className="mr-4 text-[var(--accent)]">
            <IoArrowBack size={22} />
          </button>
          <h2
            className="text-lg font-semibold flex-1 text-center pr-10"
            style={{ color: "var(--text-primary)" }}
          >
            Filters
          </h2>
        </div>

        <div className="flex-1 px-5 pt-4 space-y-8 overflow-y-auto">
          <div className="space-y-3">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Characters
            </p>
            <div className="flex flex-wrap gap-2">
              <PillButton
                key="all"
                label="All"
                isActive={characterFilter.originId === "all"}
                onClick={() => setCharacterFilter({ originId: "all" })}
              />
              {origins.map((origin) => (
                <PillButton
                  key={origin.id}
                  label={origin.name}
                  isActive={characterFilter.originId === origin.id}
                  onClick={() => setCharacterFilter({ originId: origin.id })}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Specie
            </p>
            <div className="flex flex-wrap gap-2">
              <PillButton
                key="all"
                label="All"
                isActive={specieFilter.speciesId === "all"}
                onClick={() => setSpecieFilter({ speciesId: "all" })}
              />

              {genders.map((gen) => (
                <PillButton
                  key={gen.id}
                  label={gen.name}
                  isActive={specieFilter.speciesId === gen.id}
                  onClick={() => setSpecieFilter({ speciesId: gen.id })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-8 pt-4">
          <button
            onClick={sendFilter}
            className={`w-full py-3.5 rounded-lg text-sm font-medium transition-colors ${
              Object.keys(specieFilter).length ||
              Object.keys(characterFilter).length
                ? "text-white"
                : "text-gray-400 cursor-default"
            }`}
            style={{
              backgroundColor: hasFilters ? "var(--accent)" : "#e5e7eb",
            }}
          >
            Filter
          </button>
        </div>
      </div>
    );
  }

  // Desktop dropdown
  return (
    <div
      className="absolute left-0 right-0 mt-2 rounded-xl z-30 p-5 space-y-6"
      style={{
        backgroundColor: "var(--surface)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid var(--border-light)",
      }}
    >
      <div className="space-y-3">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Character
        </p>
        <div className="flex flex-wrap gap-2">
          <PillButton
            key="all"
            label="All"
            isActive={characterFilter.originId === "all"}
            onClick={() => setCharacterFilter({ originId: "all" })}
          />
          {origins.map((origin) => (
            <PillButton
              key={origin.id}
              label={origin.name}
              isActive={characterFilter.originId === origin.id}
              onClick={() => setCharacterFilter({ originId: origin.id })}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Specie
        </p>
        <div className="flex flex-wrap gap-2">
          <PillButton
            key="all"
            label="All"
            isActive={specieFilter.speciesId === "all"}
            onClick={() => setSpecieFilter({ speciesId: "all" })}
          />
          {genders.map((gen) => (
            <PillButton
              key={gen.id}
              label={gen.name}
              isActive={specieFilter.speciesId === gen.id}
              onClick={() => setSpecieFilter({ speciesId: gen.id })}
            />
          ))}
        </div>
      </div>

      <button
        onClick={sendFilter}
        className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
          hasFilters ? "text-white" : "text-gray-500"
        }`}
        style={{
          backgroundColor:
            Object.keys(specieFilter).length ||
            Object.keys(characterFilter).length
              ? "var(--accent)"
              : "#f3f4f6",
          border:
            Object.keys(specieFilter).length ||
            Object.keys(characterFilter).length
              ? "none"
              : "1px solid #e5e7eb",
        }}
      >
        Filter
      </button>
    </div>
  );
};
