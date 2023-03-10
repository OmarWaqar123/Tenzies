import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
// import AboutPage from "./AboutPage";
import Game from "./Game"

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/game" exact component={Game} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
