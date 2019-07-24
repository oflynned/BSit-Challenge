export const statsMap = stat => {
    switch (stat) {
        case "hp":
            return "HP";
        case "hpperlevel":
            return "HP per level";
        case "mp":
            return "MP";
        case "mpperlevel":
            return "MP per level";
        case "movespeed":
            return "Move speed";
        case "armor":
            return "Armor";
        case "armorperlevel":
            return "Armor per level";
        case "spellblock":
            return "Spell block";
        case "spellblockperlevel":
            return "Spell block per level";
        case "attackrange":
            return "Attack range";
        case "hpregen":
            return "HP regen";
        case "hpregenperlevel":
            return "HP regen per level";
        case "mpregen":
            return "MP regen";
        case "mpregenperlevel":
            return "MP regen per level";
        case "crit":
            return "Crit";
        case "critperlevel":
            return "Crit per level";
        case "attackdamage":
            return "Attack damage";
        case "attackdamageperlevel":
            return "Attack damage per level";
        case "attackspeedoffset":
            return "Attack speed offset";
        case "attackspeedperlevel":
            return "Attack speed per level";
        default:
            return stat;
    }
};
