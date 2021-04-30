import React from "react";
import { connect } from "react-redux";

import { imgUser, imgNotification } from "../../../Data/images";
import { linkNotification } from "../../../Data/links";

function Index({ username }) {
  return (
    <div className="top-nav">
      <div className="nav-left">
        <img className="user-icon" src={imgUser} alt="user" />
        {username ? username : "null"}
      </div>
      <div className="nav-right">
        <a href={linkNotification}>
          <img
            className="notification-icon"
            src={imgNotification}
            alt="notification"
          />
        </a>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.auth.user ? state.auth.user.name : null,
});

export default connect(mapStateToProps, {})(Index);
