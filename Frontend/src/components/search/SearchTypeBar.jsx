import { POKE_TYPE_LIST, POKE_TYPE_STYLES } from "../../constants";
import { usePokemonSearchContext } from "./context/PokemonSearchContext";
import { Text, useMessage } from "../shared/core";
import {
  ActionIcon,
  Button,
  Chip,
  Flex,
  rgba,
  useMantineTheme,
  Card,
} from "@mantine/core";
import { getMantineThemeTokenFromColor } from "../../functions/style";
import { getPokemonByTypeData } from "../../functions/pokemon";
import { IconSearch } from "@tabler/icons-react";
import { themeColor } from "../../constants";
import { useEffect } from "react";

const SearchButtonIcon = () => {
  return <IconSearch stroke={3} size={16} />;
};

const TypeChipVariants = POKE_TYPE_STYLES;

const TypeChip = ({ variant = "default", checked = false, onChange }) => {
  const theme = useMantineTheme();
  const resolveVariant = (TypeChipVariants[variant] || TypeChipVariants.default)
    ?.color;
  const chipLabel = variant.toUpperCase();
  const textColor = checked ? "white" : resolveVariant;
  const resolveVariantThemeColor = getMantineThemeTokenFromColor(
    resolveVariant,
    theme
  );
  const labelBgColor = checked
    ? resolveVariantThemeColor
    : rgba(resolveVariantThemeColor, 0.2);

  return (
    <Chip
      color={resolveVariant}
      checked={checked}
      size={"xs"}
      onChange={onChange}
      radius={"sm"}
      w={100}
      styles={{
        label: {
          backgroundColor: labelBgColor,
          width: "100%",
          justifyContent: "center",
        },
      }}
    >
      <Text variant={"label-sm-strong"} c={textColor} lh={0}>
        {chipLabel}
      </Text>
    </Chip>
  );
};

export const SearchTypeBar = () => {
  const {
    setSearchType,
    searchType,
    setResultItems,
    pagination,
    resultItems,
    setPagination,
    setSearchMode,
    loading,
    setLoading,
  } = usePokemonSearchContext();
  const { setUserAlert } = useMessage();

  const handleGetPokemonByType = (pokeType) => {
    // fetch 10 pokemon by type
    getPokemonByTypeData(pokeType, pagination)
      .then((result) => {
        if (result) {
          const { results, total } = result;
          setResultItems(results);
          if (results.length < total) {
            setPagination({
              ...pagination,
              total: total,
              offset: pagination.offset + results.length,
            });
          }
        } else {
          setUserAlert(
            "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
            "error"
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setUserAlert(
          "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
          "error"
        );
        setLoading(false);
      });
  };

  const handleChipChange = (pokeType) => {
    setSearchType(pokeType);
    setLoading(true);
    handleGetPokemonByType(pokeType);
  };

  const handleSearchSwitch = (pokeType) => {
    setSearchMode("all");
    handleGetPokemonByType(pokeType);
  };

  return (
    <Card shadow={"md"} radius={"md"} maw={1000} w={"100%"}>
      <Flex gap={"sm"} w={"100%"} align={"flex-start"}>
        <Flex wrap={"wrap"} rowGap={4} columnGap={8} w={"100%"} flex={1}>
          {POKE_TYPE_LIST.map((pokeType, index) => (
            <TypeChip
              key={`filter-${index}-${pokeType}`}
              variant={pokeType}
              checked={searchType === pokeType}
              onChange={() => handleChipChange(pokeType)}
            >
              {pokeType}
            </TypeChip>
          ))}
        </Flex>
        <Flex align={"center"}>
          <ActionIcon
            radius={"md"}
            size={"lg"}
            mr={"xs"}
            hiddenFrom={"md"}
            onClick={handleSearchSwitch}
            color={themeColor.primary}
          >
            <SearchButtonIcon />
          </ActionIcon>
          <Button
            color={themeColor.primary}
            leftSection={<SearchButtonIcon />}
            radius={"md"}
            mr={"xs"}
            visibleFrom={"md"}
            onClick={handleSearchSwitch}
          >
            Search
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
