import { PokemonInfo } from "./PokemonInfo";

export const PokemonInfoLoader = ({
  pokemonData,
  loading,
  handleOpenTeamDrawer,
}) => {
  return (
    <PokemonInfo
      loading={loading}
      pokemonData={pokemonData}
      handleAddToTeam={handleOpenTeamDrawer}
    />
  );
};
