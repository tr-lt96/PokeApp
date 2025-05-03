import { Card, TextInput, Button, Flex, ActionIcon } from "@mantine/core";
import { IconSearch, IconCategoryFilled, IconX } from "@tabler/icons-react";
import { themeColor } from "../../constants";
import { useForm } from "@mantine/form";
import { searchPokemonByNameId } from "../../functions/pokemon";
import { usePokemonSearchContext } from "./context/PokemonSearchContext";
import { useMessage } from "../shared/core";

const SearchButtonIcon = () => {
  return <IconSearch stroke={3} size={16} />;
};

const TypeSearchSwitchButtonIcon = () => {
  return <IconCategoryFilled stroke={2} size={16} />;
};

const ResetSearchIcon = () => {
  return <IconX stroke={2} size={16} />;
};

export const SearchBar = () => {
  const { setSearchQuery, setResultItems, setSearchMode, setLoading } =
    usePokemonSearchContext();
  const { setUserAlert } = useMessage();
  const searchForm = useForm({
    initialValues: {
      pokemonName: "",
    },

    validate: {
      pokemonName: (value) => {
        return /^[a-zA-Z0-9-]*$/.test(value)
          ? null
          : "Invalid pokemon name or ID";
      },
    },
  });

  const handleSearch = (values) => {
    setLoading(true);
    setSearchMode("name");
    let searchQuery = values.pokemonName;
    // Sanitise search input
    if (!/^[a-zA-Z-]*$/.test(values.pokemonName)) {
      // Probaly user is searching pokemon via a pokemon number
      searchQuery = parseInt(values.pokemonName);
      if (isNaN(searchQuery)) {
        searchForm.setFieldError(
          "pokemonName",
          "You know that's not a valid pokemon name or number - are you trying to break the system?"
        );
        return;
      }
    }

    setSearchQuery(searchQuery);

    searchPokemonByNameId(searchQuery)
      .then((pokemonData) => {
        if (pokemonData) {
          setResultItems([pokemonData]);
        } else {
          setUserAlert(
            "Pokemon not found, are you sure it's a pokemon ?",
            "error"
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setUserAlert(
          "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
          "error"
        );
        setLoading(false);
      });
  };

  const handleSwitchSearchType = () => {
    setSearchMode("type");
  };

  const handleResetSearch = () => {
    searchForm.reset();
    searchForm.setValues({ pokemonName: "" });
    setResultItems([]);
    setSearchMode("all");
  };

  return (
    <Card shadow={"md"} radius={"md"} maw={1000} w={"100%"}>
      <form onSubmit={searchForm.onSubmit(handleSearch)}>
        <Flex gap={"sm"} w={"100%"} align={"flex-start"}>
          <TextInput
            required
            variant={"filled"}
            radius={"md"}
            placeholder="Search pokemon by name or number"
            flex={1}
            {...searchForm.getInputProps("pokemonName")}
          />
          <Flex align={"center"}>
            <ActionIcon
              color={"red"}
              radius={"md"}
              size={"lg"}
              mr={"xs"}
              variant="light"
              onClick={handleResetSearch}
            >
              <ResetSearchIcon />
            </ActionIcon>
            <ActionIcon
              color={themeColor.primary}
              radius={"md"}
              size={"lg"}
              mr={"xs"}
              hiddenFrom={"md"}
              type="submit"
            >
              <SearchButtonIcon />
            </ActionIcon>
            <ActionIcon
              radius={"md"}
              size={"lg"}
              mr={"xs"}
              variant="light"
              hiddenFrom={"md"}
              onClick={handleSwitchSearchType}
            >
              <TypeSearchSwitchButtonIcon />
            </ActionIcon>
            <Button
              color={themeColor.primary}
              leftSection={<SearchButtonIcon />}
              radius={"md"}
              mr={"xs"}
              visibleFrom={"md"}
              type="submit"
            >
              Search
            </Button>
            <Button
              color={themeColor.primary}
              leftSection={<TypeSearchSwitchButtonIcon />}
              radius={"md"}
              mr={"xs"}
              visibleFrom={"md"}
              variant="light"
              onClick={handleSwitchSearchType}
            >
              Type search
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};
