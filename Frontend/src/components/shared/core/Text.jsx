import { Text as MantineCoreText } from "@mantine/core";
import { themeColor } from "../../../constants";

/**
 * List all of text variants like body text, title text, etc.
 * The text variants are loosely based on Material Design typography token structure https://m3.material.io/styles/typography/type-scale-tokens
 */
const TextVariants = {
  // title
  "heading-md": {
    fw: 600,
    size: "lg",
  },
  "heading-md-strong": {
    fw: 900,
    size: "lg",
  },
  "heading-lg": {
    fw: 600,
    size: "xl",
  },
  "heading-lg-strong": {
    fw: 900,
    size: "xl",
  },
  "heading-xl": {
    fw: 600,
    fz: 28,
  },
  "heading-xl-strong": {
    fw: 900,
    fz: 28,
  },
  // body
  "body-md": {
    fw: 500,
    size: "sm",
  },
  "body-md-strong": {
    fw: 800,
    size: "sm",
  },
  //labels
  "label-sm": {
    fw: 600,
    size: "xs",
  },
  "label-sm-strong": {
    fw: 800,
    size: "xs",
  },
  "label-md": {
    fw: 600,
    size: "sm",
  },
  "label-md-strong": {
    fw: 800,
    size: "sm",
  },
  "label-lg": {
    fw: 600,
    size: "md",
  },
  "label-lg-strong": {
    fw: 800,
    size: "md",
  },
};

export const Text = ({ variant = "body-md", children, ...mantineProps }) => {
  const resolvedProps = {
    c: themeColor.neutral,
    ...(TextVariants[variant] || TextVariants["body-md"]),
    ...mantineProps,
  };

  return <MantineCoreText {...resolvedProps}>{children}</MantineCoreText>;
};
