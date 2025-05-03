import { Flex } from "@mantine/core";
import { TypeBadge } from "./TypeBadge";

export const TypeInfo = ({
  types,
  keyID,
  size = "sm",
  style,
  wrap = false,
}) => {
  const wrapStyle = wrap ? "wrap" : "nowrap";

  return (
    <Flex gap={6} wrap={wrapStyle} style={style}>
      {types.map((type, index) => (
        <TypeBadge
          key={`${keyID}-${index}-${type}`}
          variant={type}
          size={size}
        />
      ))}
    </Flex>
  );
};
