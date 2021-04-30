import React, { useState } from "react";
import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";

//custom paths and links
import { linkDashboard } from "../../Data/links";
// import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
// import PropTypes from "prop-types";

function Index({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Redirect to={linkDashboard} />;
  }

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('SUCCESS');
    login(email, password);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Index);
