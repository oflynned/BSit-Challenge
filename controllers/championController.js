import Champion from "../models/champion/champion";

export const findWithPagination = async ({query}) => {
    const {limit, offset} = Object.assign({limit: 10, offset: 0}, query);
    return Champion.findWithPagination({}, limit, offset);
};

export const findChampionById = async ({params}) => {
    const {championId} = params;
    if (!championId || championId.length === 0) {
        throw new Error("bad_request");
    }

    const champions = await Champion.findById(championId);
    if (champions.length === 0) {
        throw new Error("champion_not_found");
    }

    return champions[0];
};
