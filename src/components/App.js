import React from "react";
import Top from "./TopPage";
import { Route, BrowserRouter } from "react-router-dom";
import Param from "./Param";

class App extends React.Component {

  render() {
    return (
      <div>

        <div>
          <BrowserRouter>
            {/* <Route exact path='/' component={Top} /> */}
            <Route exact path='/dashboard' component={Top} />
            <Route path='/MrBeast/:id' component={Param} />
            {/* <Route path='/view/:id' component={Param2} /> */}
          </BrowserRouter>
        </div>

      </div>
    );
  }
}

export default App;
