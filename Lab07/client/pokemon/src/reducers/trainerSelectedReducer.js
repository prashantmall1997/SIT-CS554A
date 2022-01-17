const initalState = [];

let copyState = null;
// let pokeIndex = 0;

const trainerSelectedReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_SELECTED_TRAINER":
      return [
        {
          id: payload.id,
          name: payload.name,
          pokemonsCaptured: payload.pokemonsCaptured,
          selected: true,
        },
      ];

    case "CATCH_SELECTED_TRAINER_POKEMON":
      copyState = [...state];
      copyState[0].pokemonsCaptured[payload.pokeId] = payload.pokeName;
      return [...copyState];

    case "RELEASE_SELECTED_TRAINER_POKEMON":
      copyState = [...state];
      delete copyState[0].pokemonsCaptured[payload.pokeId];
      return [...copyState];

    case "REMOVE_SELECTED_TRAINER":
      return [];

    default:
      return state;
  }
};

export default trainerSelectedReducer;
