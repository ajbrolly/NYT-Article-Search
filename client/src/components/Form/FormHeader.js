import React from "react";

export const FormHeader = props => (
    <div className="form-group">
        <div className="panel">
            <div className="panel-heading">{props.children}
            </div>
        </div>
    </div>
);
