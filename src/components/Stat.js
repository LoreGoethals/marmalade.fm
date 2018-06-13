import React, {Component} from "react";
import Counter from './Counter';

const Stat = ({statName, statNumber, statWord}) => (
  <div className="mb4">
    <div className="f5 bblack mb0 b">{statName}</div>

    <Counter end={statNumber} duration={3} />
    <div className="f4 1h-1">{statWord}
    </div>
  </div>
);

export default Stat;
