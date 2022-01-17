import { v4 as uuid } from "uuid";
const initalState = [];

let copyState = null;
let index = 0;
// let pokeIndex = 0;

const trainerReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TRAINER":
      return [
        ...state,
        {
          id: uuid(),
          name: payload.name,
          pokemonsCaptured: {},
          selected: false,
        },
      ];

    case "DELETE_TRAINER":
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState.splice(index, 1);
      return [...copyState];

    case "SELECT_TRAINER":
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState[index].selected = true;
      return [...copyState];

    case "UNSELECT_TRAINER":
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState[index].selected = false;
      return [...copyState];

    case "CATCH_POKEMON":
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState[index].pokemonsCaptured[payload.pokeId] = payload.pokeName;
      return [...copyState];

    case "RELEASE_POKEMON":
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      delete copyState[index].pokemonsCaptured[payload.pokeId];
      return [...copyState];

    default:
      return state;
  }
};

export default trainerReducer;
