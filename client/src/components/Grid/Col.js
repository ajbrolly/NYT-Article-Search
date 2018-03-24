import React from "react";
import "./grid.css";


export const Col = ({ size, children }) => (
    <div className='col-md-12'>
        {children}
    </div>
);
