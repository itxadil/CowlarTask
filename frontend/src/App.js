import React from "react";
import { BrowserRouter, Switch,Route } from "react-router-dom";
import TODO from "./pages/home/home";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={TODO} ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
