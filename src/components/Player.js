/*global Mixcloud*/

import React, { Component } from "react";
import { connect } from 'react-redux';
import actions from '../store/actions';

class Player extends Component {

  componentWillReceiveProps(nextProps) {
    // when our widget is not ready, we return
    // and ignore all the actions below
    if (!nextProps.widgetReady) {
      return;
    }

    if (nextProps.currentMix !== this.props.currentMix) {
      // if there is a new mix in the props
      // start playing the mix
      this.widget.load(nextProps.currentMix, true);
      // if the event hasn’t come from mixcloud, we want to
      // toggle the play pause on our audio
    } else if (!nextProps.fromMixcloud) {
      this.widget.togglePlay();
    }
  }

  mountAudio = async () => {
    const { playMix, setWidgetReady } = this.props;
    // when we use the this keyword, our widget is now accessible
    // anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player);
    // here we wait for our widget to be ready before continuing
    await this.widget.ready;

    // here we set our widget state to be ready in redux so
    // we can block anything from happening before it's ready
    setWidgetReady(true);

    // using the mixcloud widget events we can detect when our
    // audio has been paused, set playing state to false
    this.widget.events.pause.on(() =>
      playMix({
        playing: false,
        fromMixcloud: true
      })
    );
    // audio is playing again, set playing state to true
    this.widget.events.play.on(() =>
      playMix({
        playing: true,
        fromMixcloud: true
      })
    );
  };

  componentDidMount() {
    this.mountAudio();
  };

  actions = {
    // we group our methods together inside of an object
    // called actions
    togglePlay: () => {
      // we want to togglePlay() on our widget
      this.widget.togglePlay();
    },
    playMix: mixName => {
      // if the mixName is the same as the currently
      // playing mix, we want to pause it instead
      const { currentMix } = this.state;
      if (mixName === currentMix) {
        // when our code sees a return statement it will
        // stop running here and exit
        return this.widget.togglePlay();
      }
      // update the currentMix in our state
      // with the the mixName
      this.setState({
        currentMix: mixName
      });
      // load a new mix by its name and then
      // start playing it immediately
      this.widget.load(mixName, true);
    }
  };
  render() {
    return (
      <iframe
        width="100%"
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FBonobo%2Fbonobo-boiler-room-mix-sept-2013%2F"
        frameBorder="0"
        className="player db fixed bottom-0 z5"
        ref={player => (this.player = player)}
      />
    );
  }
};

export default connect(state => state, actions)(Player);
