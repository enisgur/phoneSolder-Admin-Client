// import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";

import {
  pathDashboard,
  pathQuotes,
  pathQuotesAll,
  pathQuotesUnpriced,
  pathCustomers,
  pathSettings,
} from "../../../Data/links";

import Sidebar from "../../Sidebar";
import Display from "../../Display";

import DashPage from "../../Pages/Dash";
import QuotesPage from "../../Pages/Quotes";
import QuotesAllPage from "../../Pages/Quotes/AllBetweenDates/";
import QuotesUnpricedPage from "../../Pages/Quotes/UnPriced";
import CustomersPage from "../../Pages/Customers";
import SettingsPage from "../../Pages/Settings";

function DashboardLayout() {
  // const { path, url } = useRouteMatch();
  const { path } = useRouteMatch();
  return (
    <div className="panel-main">
      <Sidebar />
      {/* <Route exact path="/dashboard" component={Display} /> */}
      <PrivateRoute exact path={pathDashboard}>
        <Display>
          <DashPage />
        </Display>
      </PrivateRoute>
      <PrivateRoute exact path={`${path.slice(0, -1)}${pathQuotes}`}>
        <Display>
          <QuotesPage />
        </Display>
      </PrivateRoute>
      <PrivateRoute exact path={`${path.slice(0, -1)}${pathQuotesAll}`}>
        <Display>
          <QuotesAllPage />
        </Display>
      </PrivateRoute>
      <PrivateRoute exact path={`${path.slice(0, -1)}${pathQuotesUnpriced}`}>
        <Display>
          <QuotesUnpricedPage />
        </Display>
      </PrivateRoute>
      <PrivateRoute exact path={`${path.slice(0, -1)}${pathCustomers}`}>
        <Display>
          <CustomersPage />
        </Display>
      </PrivateRoute>
      <PrivateRoute exact path={`${path.slice(0, -1)}${pathSettings}`}>
        <Display>
          <SettingsPage />
        </Display>
      </PrivateRoute>

      {/* TESTTTT */}
      {/* <PrivateRoute exact path={`${path.slice(0, -1)}/a`} component={Asd} /> */}

      {/* <PrivateRoute path="/dashboard/*">
        <div>NO MATCH</div>
      </PrivateRoute> */}
    </div>

    // <div className="panel-main">
    //   <Sidebar />
    //   <Display />
    // </div>
  );
}

// function Asd() {
//   return (
//     <div
//       style={{
//         color: "red",
//         backgroundColor: "yellow",
//         display: "block",
//         top: "0",
//         left: "0",
//         position: "relative",
//       }}
//     >
//       asdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasda
//     </div>
//   );
// }

export default DashboardLayout;
