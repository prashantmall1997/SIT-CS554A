const addTrainer = (name) => ({
  type: "ADD_TRAINER",
  payload: { name: name },
});

const deleteTrainer = (id) => ({
  type: "DELETE_TRAINER",
  payload: { id: id },
});

const selectTrainer = (id) => ({
  type: "SELECT_TRAINER",
  payload: { id: id },
});

const unselectTrainer = (id) => ({
  type: "UNSELECT_TRAINER",
  payload: { id: id },
});

const catchPokemon = (id, pokeId, pokeName) => ({
  type: "CATCH_POKEMON",
  payload: { id: id, pokeId: pokeId, pokeName: pokeName },
});

const releasePokemon = (id, pokeId) => ({
  type: "RELEASE_POKEMON",
  payload: { id: id, pokeId: pokeId },
});

const updateSelectedTrainer = (id, name, pokemonsCaptured) => ({
  type: "UPDATE_SELECTED_TRAINER",
  payload: {
    id: id,
    name: name,
    pokemonsCaptured: pokemonsCaptured,
  },
});

const catchSelectedTrainerPokemon = (pokeId, pokeName) => ({
  type: "CATCH_SELECTED_TRAINER_POKEMON",
  payload: {
    pokeId: pokeId,
    pokeName: pokeName,
  },
});

const releaseSelectedTrainerPokemon = (pokeId) => ({
  type: "RELEASE_SELECTED_TRAINER_POKEMON",
  payload: {
    pokeId: pokeId,
  },
});

const removeSelectedTrainer = () => ({
  type: "REMOVE_SELECTED_TRAINER",
});

module.exports = {
  addTrainer,
  deleteTrainer,
  selectTrainer,
  unselectTrainer,
  catchPokemon,
  releasePokemon,
  updateSelectedTrainer,
  catchSelectedTrainerPokemon,
  releaseSelectedTrainerPokemon,
  removeSelectedTrainer,
};
