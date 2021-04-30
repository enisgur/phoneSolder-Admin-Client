import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// custom paths
import { pathDashboard } from "./Data/links";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import PrivateRoute from "./Components/PrivateRoute";
import DashboardLayout from "./Components/Layouts/Dashboard";
import LoginLayout from "./Components/Layouts/Login";
// import Sidebar from "./Components/Sidebar";
// import Display from "./Components/Display";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path={`${pathDashboard}*`}
            component={DashboardLayout}
          />
          <Route exact path="/" component={LoginLayout} />
          <Route path="*">
            <div>NO MATCH</div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
