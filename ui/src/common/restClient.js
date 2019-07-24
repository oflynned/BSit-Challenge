export const championsEndpoint = "/api/champions";
export const limit = 10;

export const getResource = async (endpoint, options = {}) => {
    const queryString = Object.getOwnPropertyNames(options).length === 0 ? "" :
        "?" + Object.keys(options).map(k => k + "=" + options[k]).join("&");
    return fetchResource(endpoint + queryString);
};

const fetchResource = async (endpoint, options) => {
    return new Promise(((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.status === 204) {
                    resolve({});
                } else if ([200, 201].includes(response.status)) {
                    resolve(response.json());
                }
            })
            .catch(err => {
                reject(err);
            })
    }))
};
