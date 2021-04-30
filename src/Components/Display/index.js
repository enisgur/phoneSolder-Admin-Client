import React from "react";
import Navbar from "./Navbar";

function Index({ children }) {
  return (
    <section className="main">
      <Navbar />
      <div className="display">{children}</div>
    </section>
  );
}

export default Index;
