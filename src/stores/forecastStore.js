import agent from '../utils/agent';
import { observable, action } from 'mobx';
import { convertTemp } from '../utils/helpers';

export class ForecastStore {
    @observable isLoadingForecast = false;
    @observable forecastErrors = undefined;

    @observable city = '';
    @observable isChecked = true;
    @observable temperatureUnit = '°C';
    @observable cityInfo = '';
    @observable extendedForecastList = [];
    @observable
    defaultQueryParams = {
        units: 'metric',
        APPID: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        cnt: 7,
    };

    @action setCity = city => (this.city = city);
    @action setError = err => (this.forecastErrors = err);

    getCurrentPosition = (
        options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 27000,
        }
    ) => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };

    @action
    handleTempUnitChange() {
        this.isChecked = !this.isChecked;
        this.temperatureUnit = this.isChecked ? '°C' : '°F';
        this.extendedForecastList.map(day => {
            for (let timeOfTheDay in day.temp) {
                if (day.temp.hasOwnProperty(timeOfTheDay)) {
                    day.temp[timeOfTheDay] = convertTemp(
                        this.temperatureUnit,
                        day.temp[timeOfTheDay]
                    );
                }
            }
        });
    }

    @action
    fetchForecastByCity = city => {
        let queryParams = {
            ...this.defaultQueryParams,
            q: city,
        };
        this.fetchForecastData(queryParams);
    };

    @action
    fetchForecastByGeoLocation = geoLocation => {
        let queryParams = {
            ...this.defaultQueryParams,
            lat: geoLocation.lat,
            lon: geoLocation.lon,
        };
        this.fetchForecastData(queryParams);
    };

    @action
    fetchForecastData = queryParams => {
        this.isLoadingForecast = true;
        this.forecastErrors = undefined;

        return agent.Forecast.get(queryParams)
            .then(
                action(forecastData => {
                    this.cityInfo = forecastData.city;
                    this.extendedForecastList = forecastData.list;
                    this.isLoadingForecast = false;
                })
            )
            .catch(
                action(
                    err =>
                        (this.forecastErrors =
                            err.response && err.response.body)
                )
            )
            .finally(
                action(() => {
                    this.isLoadingForecast = false;
                })
            );
    };
}

export default new ForecastStore();
