import logo from "./../img/pokemon.png";
import "./../App.css";
import Homepage from "./Homepage";
import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon";
import Trainer from "./Trainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">Welcome to the Pokemon 3000</h1>
          <Link className="pokeLink" to="/pokemon/page/1">
            Pokemon List
          </Link>
          <Link className="pokeLink" to="/pokemon/1">
            Individual Pokemon
          </Link>
          <Link className="pokeLink" to="/trainers">
            Trainers
          </Link>
        </header>
        <br />
        <br />
        <div className="App-body">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/pokemon/page/:pagenum" component={PokemonList} />
          <Route exact path="/pokemon/:pokeId" component={Pokemon} />
          <Route exact path="/trainers" component={Trainer} />
        </div>
      </div>
    </Router>
  );
}

export default App;
