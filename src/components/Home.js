import React from "react";
import Mix from './Mix';

const Home = ({mixes, ...props}) => (<div className="flex flex-wrap justify-between mixes ph3">

{mixes.slice(0, 6).map(mix => (
  <div className="mix mb4">
    <Mix {...props} {...mix} id={mix.key}/>
  </div>
))}


</div>
);


export default Home;
