export const getMantineThemeTokenFromColor = (color, theme) => {
  const colorProps = color.split('.')
  const variantColor = colorProps[0]
  const colorIntensity = colorProps[1] || 7

  return theme?.colors?.[variantColor]?.[colorIntensity] || "#000000"
}