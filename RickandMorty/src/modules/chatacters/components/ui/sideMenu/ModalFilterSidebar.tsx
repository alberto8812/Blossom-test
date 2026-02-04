import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
  isMobile: boolean;
}

export interface FilterState {
  character: "all" | "starred" | "others";
  specie: "all" | "human" | "alien";
}

export const defaultFilters: FilterState = {
  character: "all",
  specie: "all",
};

export const getActiveFilterCount = (filters: FilterState): number => {
  let count = 0;
  if (filters.character !== "all") count++;
  if (filters.specie !== "all") count++;
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
}: Props) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const hasFilters =
    filters.character !== "all" || filters.specie !== "all";

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "var(--surface)" }}>
        <div className="flex items-center px-5 py-4">
          <button onClick={onClose} className="mr-4 text-[var(--accent)]">
            <IoArrowBack size={22} />
          </button>
          <h2 className="text-lg font-semibold flex-1 text-center pr-10" style={{ color: "var(--text-primary)" }}>
            Filters
          </h2>
        </div>

        <div className="flex-1 px-5 pt-4 space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Characters
            </p>
            <div className="flex gap-3">
              <PillButton
                label="All"
                isActive={filters.character === "all"}
                onClick={() => setFilters({ ...filters, character: "all" })}
              />
              <PillButton
                label="Starred"
                isActive={filters.character === "starred"}
                onClick={() => setFilters({ ...filters, character: "starred" })}
              />
              <PillButton
                label="Others"
                isActive={filters.character === "others"}
                onClick={() => setFilters({ ...filters, character: "others" })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Specie
            </p>
            <div className="flex gap-3">
              <PillButton
                label="All"
                isActive={filters.specie === "all"}
                onClick={() => setFilters({ ...filters, specie: "all" })}
              />
              <PillButton
                label="Human"
                isActive={filters.specie === "human"}
                onClick={() => setFilters({ ...filters, specie: "human" })}
              />
              <PillButton
                label="Alien"
                isActive={filters.specie === "alien"}
                onClick={() => setFilters({ ...filters, specie: "alien" })}
              />
            </div>
          </div>
        </div>

        <div className="px-5 pb-8 pt-4">
          <button
            onClick={handleApply}
            className={`w-full py-3.5 rounded-lg text-sm font-medium transition-colors ${
              hasFilters
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
        <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Character
        </p>
        <div className="flex gap-3">
          <PillButton
            label="All"
            isActive={filters.character === "all"}
            onClick={() => setFilters({ ...filters, character: "all" })}
          />
          <PillButton
            label="Starred"
            isActive={filters.character === "starred"}
            onClick={() => setFilters({ ...filters, character: "starred" })}
          />
          <PillButton
            label="Others"
            isActive={filters.character === "others"}
            onClick={() => setFilters({ ...filters, character: "others" })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Specie
        </p>
        <div className="flex gap-3">
          <PillButton
            label="All"
            isActive={filters.specie === "all"}
            onClick={() => setFilters({ ...filters, specie: "all" })}
          />
          <PillButton
            label="Human"
            isActive={filters.specie === "human"}
            onClick={() => setFilters({ ...filters, specie: "human" })}
          />
          <PillButton
            label="Alien"
            isActive={filters.specie === "alien"}
            onClick={() => setFilters({ ...filters, specie: "alien" })}
          />
        </div>
      </div>

      <button
        onClick={handleApply}
        className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
          hasFilters
            ? "text-white"
            : "text-gray-500"
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
