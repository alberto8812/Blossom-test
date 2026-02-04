import { CiSearch } from "react-icons/ci";
import { CiSliderVertical } from "react-icons/ci";

import { useState } from "react";
import { useFilterSharestore } from "../shared/presentation/store";

interface Props {
  handleFilterModal: (isOpenFilter: boolean) => void;
  isOpenFilter: boolean;
}

export const SearchSideMenu = ({ handleFilterModal, isOpenFilter }: Props) => {
  const [Namefilter, setNameFilter] = useState("");
  const nameFilter = useFilterSharestore(
    (state) => state.setNameCharacterFilter,
  );

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNameFilter(name);

    if (name.trim() === "") {
      nameFilter({});
      return;
    }

    if (name.trim() !== "" && name.length > 0) {
      nameFilter({ name: name });
      return;
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <CiSearch className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full py-2.5 ps-9 pe-10 text-sm rounded-lg"
        style={{
          border: "1px solid var(--border-light)",
          backgroundColor: "var(--surface)",
        }}
        placeholder="Search or filter results"
        value={Namefilter}
        onChange={handleInputSearch}
      />
      <button
        type="button"
        className="absolute end-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-gray-100"
        onClick={() => handleFilterModal(!isOpenFilter)}
      >
        <CiSliderVertical
          className="w-4 h-4"
          style={{ color: "var(--accent)" }}
        />
      </button>
    </div>
  );
};
