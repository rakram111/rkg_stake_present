import React from "react";
import Top from "./TopPage";
import { Route, BrowserRouter } from "react-router-dom";
import Param from "./Param";
import JoiningGuide from "./JoinGuide";
import TopSponsor from "./TopSponsor";
import AboutUs from "./AboutUs";
import Param2 from "./Param2";

class App extends React.Component {

  render() {
    return (
      <div>

        <div>
          <BrowserRouter>
            <Route exact path='/' component={Top} />
            <Route exact path='/joiningGuide' component={JoiningGuide} />
            <Route exact path='/topSponsors' component={TopSponsor} />
            <Route exact path='/aboutUs' component={AboutUs} />
            <Route path='/refid/:id' component={Param} />
            <Route path='/view/:id' component={Param2} />
          </BrowserRouter>
        </div>

      </div>
    );
  }
}

export default App;
