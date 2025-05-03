import { Button, Flex, Skeleton } from "@mantine/core";
import {
  initSearchContextValue,
  usePokemonSearchContext,
} from "./context/PokemonSearchContext";
import { PokemonInfoCard } from "../shared/info";
import { themeColor } from "../../constants";
import {
  getAllPokemonData,
  getPokemonByTypeData,
} from "../../functions/pokemon";
import { useMessage } from "../shared/core";
import { useEffect } from "react";

export const PokemonSearchResults = () => {
  const {
    resultItems = [],
    searchMode,
    setResultItems,
    searchType,
    pagination,
    setPagination,
    loading,
    setLoading,
  } = usePokemonSearchContext();

  const { setUserAlert } = useMessage();

  const handleFetchBatchPokemon = async (isReset) => {
    let resultData = null;

    if (isReset) {
      setPagination(initSearchContextValue.pagination);
    }

    try {
      if (searchMode === "type") {
        resultData = await getPokemonByTypeData(searchType, pagination);
      } else if (searchMode === "all") {
        resultData = await getAllPokemonData(pagination);
      } else {
        setLoading(false);
        return;
      }

      setLoading(false);

      if (!resultData) {
        setUserAlert(
          "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
          "error"
        );
        return;
      }

      // filter search result
      const { results, total } = resultData;
      setResultItems([...resultItems, ...results]);

      setPagination({
        ...pagination,
        total,
        offset: pagination.offset + results.length,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setUserAlert(
        "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
        "error"
      );
    }
  };

  useEffect(() => {
    handleFetchBatchPokemon(true);
  }, [searchMode]);

  return (
    <>
      <Flex direction={"row"} gap={"md"} wrap={"wrap"} mb={"md"}>
        {resultItems?.length > 0
          ? resultItems.map((item, index) => {
              return (
                <PokemonInfoCard key={`pokemon-result-${index}`} {...item} />
              );
            })
          : null}
      </Flex>
      {searchMode !== "name" && pagination.total > pagination.offset ? (
        <Skeleton visible={loading}>
          <Button
            color={themeColor.primary}
            radius={"md"}
            mr={"xs"}
            visibleFrom={"md"}
            onClick={handleFetchBatchPokemon}
          >
            See some more ?
          </Button>
        </Skeleton>
      ) : null}
    </>
  );
};
