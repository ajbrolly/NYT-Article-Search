import React from "react";
import "./List.css";


// Destructuring the type, className, children and onClick props, applying them to the button element
export const SaveBtn = ({ type, children, onClick }) => (
  <button
    onClick={onClick}
    className={["btn", `btn-${type}`].join(" ")}
  >
    {children}
  </button>
);
