import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// actions
import { logout } from "../../../actions/auth";

import {
  imgDashboard,
  imgQuotes,
  imgCustomers,
  imgSettings,
  imgSignout,
} from "../../../Data/images";
import {
  linkDashboard,
  linkQuotes,
  linkCustomers,
  linkSettings,
  // linkSignout,
} from "../../../Data/links";

function Index({ logout }) {
  return (
    <section className="pages">
      <ul className="top-pages">
        <li className="page">
          <Link className="page-link" to={linkDashboard}>
            <img className="page-icon" src={imgDashboard} alt="dashboard" />
            Dashboard
          </Link>
        </li>
        <li className="page">
          <Link className="page-link" to={linkQuotes}>
            <img className="page-icon" src={imgQuotes} alt="quotes" />
            Quotes
          </Link>
        </li>
        <li className="page">
          <Link className="page-link" to={linkCustomers}>
            <img className="page-icon" src={imgCustomers} alt="customers" />
            Customers
          </Link>
        </li>
        <li className="page">
          <Link className="page-link" to={linkSettings}>
            <img className="page-icon" src={imgSettings} alt="settings" />
            Settings
          </Link>
        </li>
      </ul>
      <ul className="bottom-pages">
        <li className="page">
          {/* <a className="page-link" href={linkSignout} onClick={logout}> */}
          <Link className="page-link" to="#" onClick={logout}>
            <img className="page-icon" src={imgSignout} alt="signout" />
            Sign Out
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default connect(null, { logout })(Index);
