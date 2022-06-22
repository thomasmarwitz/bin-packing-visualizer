import axios from 'axios';

export const baseUrl = "http://localhost:8080"

const timeoutVal = 5 * 60 * 1000 // 5 minutes

const getFromAPI = (endpoint) => {
    return axios.get(baseUrl + endpoint, { timeout: timeoutVal });
}

const postAtAPI = (endpoint, data) => {
    // don't pack "data" in an object, the api accepts only an array of values (e.g. model list)
    return axios.post(baseUrl + endpoint, data, { timeout: timeoutVal }); 
}

export const postBinPacking = (data) => {
    return postAtAPI(
        "/pack",
        data
    );
}