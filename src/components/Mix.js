import React from "react";
import PlayButton from "./PlayButton.js";
import PlayMix from "./PlayMix.js";

const Mix = ({ name, pictures, ...props}) => (
  <div
    className="aspect-ratio aspect-ratio--3x4 pointer bg-black cover bg-center"
    style={{backgroundImage: `url(${pictures.extra_large})`}}
    >


    <PlayMix {...props}>
      <div className="ph3 pv4 aspect-ratio--object mix-overlay">
        <div className="flex items-center relative z-2">
          <h1 className="f4 f3-l mv0 white ttu biryani pr2 lh-title">{name}</h1>
          <PlayButton />
        </div>
      </div>
    </PlayMix>
  </div>
);

export default Mix;
