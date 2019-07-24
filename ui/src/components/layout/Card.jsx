import React from "react";
import PropTypes from 'prop-types';

import "./card.css";

const Card = ({champion, onClick}) => {
    const {name, title, tags, description, icon} = champion;
    return (
        <div className={"card action"} onClick={() => onClick(champion)}>
            <div className={"card-heading"}>
                <img alt={"lol character icon"} src={icon}/>
                <div>
                    <h1 className={"heading"}>{name} ({title})</h1>
                    <p>
                        {tags.map((tag, index) => (tag + (index < tags.length - 1 ? "/" : "")))}
                    </p>
                </div>
            </div>
            <p className={"content"}>{description}</p>
        </div>
    );
};

Card.propTypes = {
  champion: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Card;
