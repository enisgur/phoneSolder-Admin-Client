import React from "react";

// contents
import { sidebar } from "../../../Data/contents";

import { imgLogo } from "../../../Data/images";
// import {  } from "../../../Data/links";

function Index() {
  return (
    <div className="top">
      <div className="logo">
        <div className="logo-img">
          <img src={imgLogo} alt="logo" />
        </div>
        <div className="logo-text">{sidebar.title}</div>
      </div>
      <hr className="top-divider" />
      <h1 className="sidebar-title">{sidebar.panelName}</h1>
    </div>
  );
}

export default Index;
