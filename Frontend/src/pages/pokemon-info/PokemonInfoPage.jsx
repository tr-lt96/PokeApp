import { useParams } from "react-router";
import { PokemonTeamListDrawer } from "../../components/pokemon-info/PokemonTeamListDrawer";
import { useDisclosure } from "@mantine/hooks";
import { PokemonInfoLoader } from "../../components/pokemon-info/PokemonInfoLoader";
import { useState, useEffect } from "react";
import { getPokemonData } from "../../functions/pokemon";
import { useMessage } from "../../components/shared/core";

export const PokemonInfoPage = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserAlert } = useMessage();

  useEffect(() => {
    getPokemonData(pokemonName)
      .then((resultData) => {
        setPokemonData({
          ...resultData,
          pokeId: resultData.pokeId,
        });
        setLoading(false);
      })
      .catch((error) => {
        setUserAlert(
          "Oh no, this pokemon ran away! Maybe try to find it again?"
        );
        console.error(error);
        setLoading(false);
      });
  }, [pokemonName]);

  const [isDrawerOpen, { open: handleOpenDrawer, close: handleCloseDrawer }] =
    useDisclosure(false);

  return (
    <>
      <PokemonInfoLoader
        loading={loading}
        pokemonData={pokemonData}
        handleOpenTeamDrawer={handleOpenDrawer}
      />
      <PokemonTeamListDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        currentPokemon={pokemonData}
      />
    </>
  );
};
