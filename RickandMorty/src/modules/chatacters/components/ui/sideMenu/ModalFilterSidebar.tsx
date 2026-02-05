import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import type { OriginDB } from "../../../../origin/domain/entity/origin.interface";
import type { SpecieDB } from "../../../../gender/domain/entity/specie.interface";

interface Props {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
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
    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "text-[var(--accent)]"
        : "border text-gray-600 hover:bg-gray-50"
    }`}
    style={
      isActive
        ? { backgroundColor: "var(--accent-light)" }
        : { borderColor: "#e5e7eb" }
    }
  >
    {label}
  </button>
);

export const ModalFilterSidebar = ({
  onClose,
  onApply,
  currentFilters,
  isMobile,
  origins,
  genders,
}: Props) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const hasFilters = filters.originId !== "all" || filters.speciesId !== "all";

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

        <div className="flex-1 px-5 pt-4 space-y-8">
          <div className="space-y-3">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Characters
            </p>
            <div className="flex gap-3">
              {origins.map((origin) => (
                <PillButton
                  key={origin.id}
                  label={origin.name}
                  isActive={filters.originId === origin.id}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      originId: origin.id,
                    })
                  }
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
            <div className="flex gap-3">
              {genders.map((gen) => (
                <PillButton
                  key={gen.id}
                  label={gen.name}
                  isActive={filters.speciesId === gen.id}
                  onClick={() => setFilters({ ...filters, speciesId: gen.id })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-8 pt-4">
          <button
            onClick={handleApply}
            className={`w-full py-3.5 rounded-lg text-sm font-medium transition-colors ${
              hasFilters ? "text-white" : "text-gray-400 cursor-default"
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
        <div className="flex gap-3">
          {origins.map((origin) => (
            <PillButton
              key={origin.id}
              label={origin.name}
              isActive={filters.originId === origin.id}
              onClick={() =>
                setFilters({
                  ...filters,
                  originId: origin.id,
                })
              }
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
        <div className="flex gap-3">
          {genders.map((gen) => (
            <PillButton
              key={gen.id}
              label={gen.name}
              isActive={filters.speciesId === gen.id}
              onClick={() => setFilters({ ...filters, speciesId: gen.id })}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleApply}
        className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
          hasFilters ? "text-white" : "text-gray-500"
        }`}
        style={{
          backgroundColor: hasFilters ? "var(--accent)" : "#f3f4f6",
          border: hasFilters ? "none" : "1px solid #e5e7eb",
        }}
      >
        Filter
      </button>
    </div>
  );
};
