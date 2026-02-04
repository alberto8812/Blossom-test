import { useFilterSharestore } from "../../../../../shared/presentation/store";
import type { SpecieDB } from "../../../../gender/domain/entity/specie.interface";
import type { OriginDB } from "../../../../origin/domain/entity/origin.interface";

interface Props {
  origins: OriginDB[];
  gender: SpecieDB[];
}

export const ModalFilterSidebar = ({ origins, gender }: Props) => {
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
  };

  return (
    <div className=" absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-4 z-30">
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-gray-600 text-sm">origins</h3>
          <div className="flex justify-evenly flex-wrap align-baseline gap-2">
            <button
              onClick={() => setCharacterFilter({ originId: "all" })}
              className={`px-6 py-2 rounded-lg text-xs ${
                characterFilter.originId === "all"
                  ? "bg-primary-Primary_100 text-primary-Primary_700"
                  : "bg-white border text-gray-700"
              }`}
            >
              All
            </button>

            {origins?.map((origin) => (
              <button
                key={origin.id}
                onClick={() => setCharacterFilter({ originId: origin.id })}
                className={`px-6 py-2 rounded-lg text-xs ${
                  characterFilter.originId === origin.id
                    ? "bg-primary-Primary_100 text-primary-Primary_700"
                    : "bg-white border text-gray-700"
                }`}
              >
                {origin?.name?.slice(0, 10)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-gray-600 text-sm">Specie</h3>
          <div className="flex justify-evenly flex-wrap align-baseline gap-2">
            <button
              onClick={() => setSpecieFilter({ speciesId: "all" })}
              className={`px-6 py-2 rounded-lg text-xs ${
                specieFilter.speciesId === "all"
                  ? "bg-primary-Primary_100 text-primary-Primary_700"
                  : "bg-white border text-gray-700"
              }`}
            >
              All
            </button>

            {gender?.map((specie) => (
              <button
                key={specie.id}
                onClick={() => setSpecieFilter({ speciesId: specie.id })}
                className={`px-6 py-2 rounded-lg text-xs ${
                  specieFilter.speciesId === specie.id
                    ? "bg-primary-Primary_100 text-primary-Primary_700"
                    : "bg-white border text-gray-700"
                }`}
              >
                {specie?.name?.slice(0, 10)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => sendFilter()}
          className={`
            ${
              Object.keys(characterFilter).length === 0 &&
              Object.keys(specieFilter).length === 0
                ? "cursor-not-allowed bg-gray-400"
                : "bg-primary-Primary_700 hover:bg-purple-700"
            }
            w-full  text-white py-3 rounded-lg transition-colors text-xs`}
          disabled={
            Object.keys(characterFilter).length === 0 &&
            Object.keys(specieFilter).length === 0
          }
        >
          Filter
        </button>
      </div>
    </div>
  );
};
