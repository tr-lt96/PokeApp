const alphabet = "abcdefghijklmnopqrstuvwxyz";
const numberStr = "0123456789";
const specialCharacters = "!@#$%^&*,.?";

const generateProfileColorMap = () => {
  let count = 0;

  const specialCharacter = Array.from(specialCharacters).reduce(
    (acc, character) => {
      count++;
      return {
        ...acc,
        [character]: count.toString(16),
      };
    },
    {}
  );

  const numberCaseColorHexMap = Array.from(numberStr).reduce(
    (acc, character) => {
      count++;
      return {
        ...acc,
        [character]: count.toString(16),
      };
    },
    {}
  );

  const lowerCaseColorHexMap = Array.from(alphabet).reduce((acc, character) => {
    count++;
    return {
      ...acc,
      [character]: count.toString(16),
    };
  }, {});

  const upperCaseColorHexMap = Array.from(alphabet.toUpperCase()).reduce(
    (acc, character) => {
      count++;
      return {
        ...acc,
        [character]: count.toString(16),
      };
    },
    {}
  );

  return {
    ...numberCaseColorHexMap,
    ...lowerCaseColorHexMap,
    ...upperCaseColorHexMap,
    ...specialCharacter,
  };
};

const PROFILE_COLOR_MAP = generateProfileColorMap();

export const generateUserProfileColor = (username = "unkown") => {
  const first3Letters = username.substring(0, 3);

  const hexCode = Array.from(first3Letters).reduce((acc, char) => {
    let partHexCode = PROFILE_COLOR_MAP[char];

    if (partHexCode.length < 2) {
      partHexCode = `0${partHexCode}`;
    }

    return acc + partHexCode;
  }, "");

  return `#${hexCode}`;
};
