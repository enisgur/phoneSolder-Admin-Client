import React from "react";
import ReactDom from "react-dom";

import "./index.css";
// MAKE SURE ADD DIV ID="PORTAL" IN PUBLIC INDEX.HTML
// MAKE SURE ADD DIV ID="PORTAL" IN PUBLIC INDEX.HTML
// MAKE SURE ADD DIV ID="PORTAL" IN PUBLIC INDEX.HTML

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,

  width: "80vw",
  heigt: "80vh",
  overflow: "scroll",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      {/* <div style={OVERLAY_STYLES} />  LIKE THIS IT DOESN'T CLOSE THE MODAL WHEN CLICKED TO OVELAY*/}
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div className="myModal">
        <button onClick={onClose}>Close Modal</button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
