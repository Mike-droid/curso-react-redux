import React from 'react';
import '../../css/loader.css';

const Loader = (props) => (
  <div className="center">
    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
);

export default Loader;