import { SearchBar } from "../../components/search/SearchBar";
import { Flex } from "@mantine/core";
import {
  PokemonSearchProvider,
  usePokemonSearchContext,
} from "../../components/search/context/PokemonSearchContext";
import { SearchTypeBar } from "../../components/search/SearchTypeBar";
import { PokemonSearchResults } from "../../components/search/PokemonSearchResults";

const SearchBars = () => {
  const { searchMode } = usePokemonSearchContext();
  return (
    <>
      {searchMode !== "type" ? <SearchBar /> : null}
      {searchMode === "type" ? <SearchTypeBar /> : null}
    </>
  );
};

export const PokemonSearchPage = () => {
  return (
    <PokemonSearchProvider>
      <Flex direction={"column"} gap={"md"} w={"100%"}>
        <SearchBars />
        <PokemonSearchResults />
      </Flex>
    </PokemonSearchProvider>
  );
};
