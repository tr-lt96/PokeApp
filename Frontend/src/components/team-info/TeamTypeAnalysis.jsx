import { useEffect, useState } from "react";
import { TypeBadge } from "../shared/info";
import {
  Card,
  Container,
  Flex,
  Rating,
  Skeleton,
  useMantineTheme,
  useMatches,
} from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { getMantineThemeTokenFromColor } from "../../functions/style";
import { Text } from "../shared/core";
import { evaluatePokemonTeam } from "../../functions/team";

const CHART_COLOR = {
  weak: "red.5",
  strong: "indigo.5",
};

const mediaResponsiveSize = {
  base: `calc(${100 / 3}% - 12px)`,
  xs: `calc(${100 / 3}% - 12px)`,
  sm: `calc(${100 / 4}% - 12px)`,
  md: `calc(${100 / 6}% - 12px)`,
  lg: `calc(${100 / 8}% - 12px)`,
};

const TypeAnalysisInfo = ({ type, chartValue, chartType }) => {
  const theme = useMantineTheme();
  const ratingColor = getMantineThemeTokenFromColor(
    CHART_COLOR[chartType],
    theme
  );
  const emptyColor = getMantineThemeTokenFromColor("gray.4", theme);
  const infoWidth = useMatches(mediaResponsiveSize);

  return (
    <div style={{ width: infoWidth }}>
      <TypeBadge variant={type} size="sm" />
      <Rating
        count={6}
        emptySymbol={<IconCircleFilled color={emptyColor} size={10} />}
        fullSymbol={<IconCircleFilled color={ratingColor} size={10} />}
        value={chartValue}
        readOnly
      />
    </div>
  );
};

const TypeAnalysisChartInfo = ({ chart = {}, chartType }) => {
  const displayLabel = chartType === "weak" ? "Weak" : "Strong";
  return (
    <Container p={0}>
      <Text c={CHART_COLOR[chartType]} variant={"heading-md-strong"}>
        {displayLabel}
      </Text>
      <Flex wrap={"wrap"} gap={"sm"}>
        {Object.keys(chart).map((type) => {
          return (
            <TypeAnalysisInfo
              key={`${chartType}-${type}`}
              type={type}
              chartValue={chart[type]}
              chartType={chartType}
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export const TeamTypeAnalysis = ({ teamPokemons, teamId }) => {
  const [weakChart, setWeakChart] = useState();
  const [strongChart, setStrongChart] = useState();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (teamPokemons.length) {
      evaluatePokemonTeam(teamId)
        .then((result) => {
          if (!result) {
            setErrorMsg(
              "Oopsie, we made some mistake and things are crashing. Time for a refresh!"
            );
          } else {
            setWeakChart(result.weakChart);
            setStrongChart(result.strongChart);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setErrorMsg(
            "Oopsie, we made some mistake and things are crashing. Time for a refresh!"
          );
          setLoading(false);
        });
    } else {
      setLoading(false);
      setErrorMsg(
        "Maybe there's nothing to analyse at all - or our Analyser has been going on holiday. They've worked hard!"
      );
    }
  }, []);

  return (
    <Skeleton visible={loading} w={"100%"}>
      <Card>
        <Text variant={"heading-lg-strong"} mb={"md"}>
          Analysis chart
        </Text>
        {teamPokemons.length > 0 && (
          <Container p={0}>
            <Flex direction={"column"} gap={"md"}>
              <TypeAnalysisChartInfo chart={weakChart} chartType={"weak"} />
              <TypeAnalysisChartInfo chart={strongChart} chartType={"strong"} />
            </Flex>
          </Container>
        )}
        <Text>{errorMsg}</Text>
      </Card>
    </Skeleton>
  );
};
