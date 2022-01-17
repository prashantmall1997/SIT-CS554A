import { combineReducers } from "redux";
import trainerReducer from "./trainerReducer";
import trainerSelectedReducer from "./trainerSelectedReducer";
const rootReducer = combineReducers({
  trainer: trainerReducer,
  trainerSelected: trainerSelectedReducer,
});

export default rootReducer;
