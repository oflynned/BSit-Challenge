import React from "react";
import PropTypes from "prop-types";

import "./primaryActionButton.css";

const PrimaryActionButton = ({onClick, label}) => (
    <div onClick={onClick} className={"button danger action"}>
        <span>{label}</span>
    </div>
);

PrimaryActionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default PrimaryActionButton;
