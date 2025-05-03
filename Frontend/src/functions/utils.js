import { POKE_TYPE_LIST } from "../constants";

/**
 * @param {string[]} stateArr
 */
export const transformPokeTypeArrToValueMap = (defaultValue = false) => {
  return POKE_TYPE_LIST.reduce((acc, state) => {
    return {
      ...acc,
      [state]: defaultValue,
    };
  }, {});
};

export const getPokemonDisplayName = (name) => {
  if (typeof name  !== 'string'){
    return name
  }
  return name[0].toUpperCase() + name.substring(1).toLowerCase();
}