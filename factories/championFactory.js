import { factory } from "factory-girl";
import Champion from "../models/champion/champion";

const generatePayload = () => {
  return {
    "id": "aatrox",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "key": "266",
    "name": "Aatrox",
    "title": "the Darkin Blade",
    "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Aatrox.png",
    "description": "One of the ancient darkin, Aatrox was once a peerless swordmaster who reveled in the bloody chaos of the battlefield. Trapped within his own blade by the magic of his foes, he waited out the millennia for a suitable host to wield him—this mortal warrior...",
    "sprite": {
      "x": 0,
      "y": 0,
      "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/champion0.png"
    },
    "stats": {
      "hp": 580,
      "hpperlevel": 85,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 33,
      "armorperlevel": 3.8,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 150,
      "hpregen": 6.5,
      "hpregenperlevel": 0.5,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 70,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.04,
      "attackspeedperlevel": 3
    }
  };
};

factory.define("champion", Champion, generatePayload());

export const seedChampion = async (overrides = {}, stats = {}) => {
  let champion = await factory.build("champion", Object.assign({}, generatePayload(), overrides));
  Object.assign(champion.stats, stats);
  return champion.save();
};

export const generateChampion = async (overrides = {}) => {
  const champion = await factory.build("champion", Object.assign({}, overrides));
  return champion.toJSON();
};
