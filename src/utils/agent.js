import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';
const superagent = superagentPromise(_superagent, global.Promise);

// API'S
const openWeatherApi = process.env.REACT_APP_OPEN_WEATHER_API;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        // openNotificationWithIcon('error', err.response, err);
    }
    return err;
};

const responseBody = res => res.body;

const requests = {
    get: (url, params = {}) =>
        superagent
            .get(url)
            .query(params)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(url, body)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(url, body)
            .end(handleErrors)
            .then(responseBody),
    del: url =>
        superagent
            .del(url)
            .end(handleErrors)
            .then(responseBody),
};

const Forecast = {
    get: params => requests.get(`${openWeatherApi}/forecast/daily`, params),
};

export default {
    Forecast,
};
