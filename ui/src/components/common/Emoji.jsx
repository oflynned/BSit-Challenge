import React from "react";
import PropTypes from "prop-types";

export const emojiMap = symbol => {
    switch (symbol) {
        case "hp":
        case "hpperlevel":
            return "⚡";
        case "mp":
            return "💉";
        case "mpperlevel":
            return "💉";
        case "movespeed":
            return "🏃‍♂️";
        case "armor":
            return "🛡️";
        case "armorperlevel":
            return "🛡️";
        case "spellblock":
            return "⚔️";
        case "spellblockperlevel":
            return "⚔️";
        case "attackrange":
            return "🗡️";
        case "hpregen":
            return "💊";
        case "hpregenperlevel":
            return "💊";
        case "mpregen":
            return "💉";
        case "mpregenperlevel":
            return "💉";
        case "crit":
            return "👊";
        case "critperlevel":
            return "👊";
        case "attackdamage":
            return "🗡️";
        case "attackdamageperlevel":
            return "🗡️";
        case "attackspeedoffset":
            return "🏃‍♂️";
        case "attackspeedperlevel":
            return "🏃‍♂️";
        default:
            return "😀";
    }
};

const Emoji = ({label, symbol}) => (
    <span
        className="emoji"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}>
        {symbol}
    </span>
);

Emoji.propTypes = {
    label: PropTypes.string,
    symbol: PropTypes.string.isRequired
};

export default Emoji;
