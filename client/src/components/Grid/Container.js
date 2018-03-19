import React from "react";
import "./grid.css";


export const Container = ({ fluid, children }) => (
    <div className={`container${fluid ? "-fluid" : ""}`}>
        {children}
    </div>
);
