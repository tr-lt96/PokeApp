import { Badge } from "@mantine/core";
import { POKE_TYPE_STYLES } from "../../../constants";

const TypeBadgeVariants = POKE_TYPE_STYLES;

export const TypeBadge = ({ variant = "default", size = "sm" }) => {
  const resolveVariant = (
    TypeBadgeVariants[variant] || TypeBadgeVariants.default
  )?.color;

  return (
    <Badge color={resolveVariant} size={size} radius={"sm"}>
      {variant}
    </Badge>
  );
};
