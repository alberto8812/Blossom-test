import { useSelectPetitionModule } from "../../../../../shared/presentation/hooks/use-SelectPetition-module";
import { getAllCharacters } from "../../../api/get-all-characters";

export const SideMenu = () => {
  const { data, isLoading } = useSelectPetitionModule("GET_ALL_CHARACTER", {
    findAll: async () => {
      const characters = await getAllCharacters();
      return { data: characters };
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Side Menu</h2>
      <ul>
        {data?.data.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};
