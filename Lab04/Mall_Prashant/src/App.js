import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Characters from "./components/Characters";
import CharactersList from "./components/CharactersList";
import Comics from "./components/Comics";
import ComicsList from "./components/ComicsList";
import Series from "./components/Series";
import SeriesList from "./components/SeriesList";
console.clear();
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">This is Lab 4 by Prashant Mall</h1>
          <Link className="showlink" to="/characters/page/0">
            Characters Listing
          </Link>

          <Link className="showlink" to="/comics/page/0">
            Comics Listing
          </Link>

          <Link className="showlink" to="/series/page/0">
            Series Listing
          </Link>
          <br />
          <br />
          <p className="App-description">
            Welcome to Marvel API! You can click on the buttons above to get a
            list of either Characters, Comics or Series or the button below to
            clear screen.
          </p>
          <br />
          <Link className="showlink" to="/">
            Destroy my universe
          </Link>
        </header>
        <br />
        <br />
        <div className="App-body">
          <Route
            exact
            path="/characters/page/:page"
            component={CharactersList}
          />
          <Route exact path="/characters/:id" component={Characters} />
          <Route exact path="/comics/page/:page" component={ComicsList} />
          <Route exact path="/comics/:id" component={Comics} />
          <Route exact path="/series/page/:page" component={SeriesList} />
          <Route exact path="/series/:id" component={Series} />
        </div>
      </div>
    </Router>
  );
}

export default App;
