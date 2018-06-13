import React, { Component } from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PlayMix from "./PlayMix";
import PlayButton from "./PlayButton";

const FeaturedMix = ({ name, pictures = {}, picture_primary_color, title, id, slug, ...props }) => (
  <div className="w-50-l vh-100 flex items-center justify-center cover bg-center bg-featured pad-bottom fixed-l left-0 mix-overlay"
    style={{ backgroundImage: `url(${pictures.extra_large})`,
    backgroundColor: `#${picture_primary_color}` 

  }}>

      <div className="w-100 tc pa3">
        <p className="b biryani f6 tc white ttu relative z2">{title}</p>
        <h1 className="mix-title mt0 bm3 anton white ttu">{name}</h1>
        <Link to={`/show/${slug}`} className="absolute absolute--fill z-3" />
<PlayMix id={id} className="relative z-5 pointer">
        <PlayButton />
  </ PlayMix>
      </div>

  </div>
);

  const getMix = state => {

    let featuredMix;

    if(state.featuredMix){
      [featuredMix] = state.mixes.filter(mix => mix.id === state.featuredMix);
    } else {
      [featuredMix] = state.mixes.filter(mix => mix.id === state.currentMix);
    }

  const [firstMix = {}] = state.mixes;
  return featuredMix || firstMix;
};

const getTitle = state => {
  if (state.featuredMix){
    return 'Currently viewing'
  } else if (state.currentMix && state.playing){
    return 'Currently playing'
  } else {
    return 'Featured mix'
  }
};

export default connect(state => ({...getMix(state), title: getTitle(state)}))(FeaturedMix);
