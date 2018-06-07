/*global Mixcloud*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeaturedMix from "./FeaturedMix.js";
import Header from "./Header.js";
import Home from "./Home.js";
import Archive from "./Archive.js";
import About from "./About.js";
import mixesData from "../data/mixes.js";



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      currentMix: '',
      mixIds: mixesData,
      mix: null,
      mixes: []
    }
  }

fetchMixes = async () => {

  const {mixIds} = this.state;
  console.log(mixIds);

  mixIds.map(async id => {
    try {
      const response = await fetch (
        `https://api.mixcloud.com${id}`
      );
      const data = await response.json();
      this.setState((prevState, props) => ({
        mixes: [...prevState.mixes, data]
      }));
    } catch (error) {
      console.log(error);
    }
  });


};

mountAudio = async () => {
  this.widget = Mixcloud.PlayerWidget(this.player);
  await this.widget.ready;
  this.widget.events.pause.on(
    () => this.setState({playing: false})
  );
  this.widget.events.play.on(
    () => this.setState({playing: true})
  );
  console.log(this.widget);
};

componentDidMount() {
  this.mountAudio();
  this.fetchMixes();
};

actions = {
  togglePlay: () => {
    this.widget.togglePlay();
  },

  playMix: mixName  => {

    const {currentMix} = this.state;
    if (mixName === currentMix) {
      return this.widget.togglePlay();
    }

    this.setState({
      currentMix: mixName
    });

    this.widget.load(mixName, true);
  }
};



  render() {

    const [firstMix = {}] = this.state.mixes;

    return (
      <Router>
        <div>
          <div className="flex-l justify-end">
            <FeaturedMix {...this.state} {...this.actions} {...firstMix} id={firstMix.key} />
            <div className="w-50-l relative z-1">
              <Header />
              <Route exact path="/" render={ () => <Home {...this.state}{...this.actions} />} />
              <Route path="/archive" render={ () => <Archive {...this.state}{...this.actions} />} />
              <Route path="/about" render={ () => <About {...this.state}/>} />
            </div>
          </div>
          <iframe
            width="100%"
            height="60"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FBonobo%2Fbonobo-boiler-room-mix-sept-2013%2F"
            frameBorder="0"
            className="player db fixed bottom-0 z5"
            ref={player => (this.player = player)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
