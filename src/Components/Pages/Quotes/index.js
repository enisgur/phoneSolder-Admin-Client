import React from "react";
import { Link } from "react-router-dom";

import { linkQuotesAll, linkQuotesUnpriced } from "../../../Data/links";

function Index() {
  return (
    <div>
      <h1>Heyyy</h1>
      <Link to={linkQuotesAll}>Go between dates</Link>
      <br />
      <Link to={linkQuotesUnpriced}>Go UnPriced quotes</Link>
    </div>
  );
}

export default Index;
