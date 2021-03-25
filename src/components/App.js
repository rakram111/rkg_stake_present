import React from "react";
import Top from "./TradePage";
import { Route, BrowserRouter } from "react-router-dom";
import Param from "./Param";
import Param2 from "./Param2";

class App extends React.Component {

  render() {
    return (
      <div>

        <div>
          <BrowserRouter>
            <Route exact path='/' component={Top} />
            <Route path='/RKG/:id' component={Param} />
            <Route path='/view/:id' component={Param2} />
          </BrowserRouter>
        </div>

      </div>
    );
  }
}

export default App;
