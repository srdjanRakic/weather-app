import React, { Component } from 'react';
import {
    getFullDate,
    getDay,
    convertTemp,
    mapTimeOfDay,
} from '../../utils/helpers';
import queryString from 'query-string';
import {
    TempUnitSlider,
    Input,
    TempUnit,
    ForecastGeneralInfo,
    ForecastStatus,
    ForecastLocation,
    ForecastDate,
    ForecastContainer,
    ForecastCard,
    ExtendedForecast,
    ForecastPeriodOfDayInfo,
    ForecastTodaysTemperature,
    ExtendedForecastList,
    ExtendedForecastItem,
    ForecastTemperatureUnit,
    ForecastThumbnail,
    CityNotFound,
} from './styled';
import FaHome from 'react-icons/lib/fa/home';
import Spinner from '../shared/Spinner';
import StyledLink from '../shared/StyledLink';
import agent from '../../utils/agent';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isChecked: true,
            temperatureUnit: '°C',
            cityInfo: '',
            extendedForecastList: [],
            forecastDataErrors: undefined,
        };
    }
    componentDidMount() {
        let city = queryString.parse(this.props.location.search).city;
        let geoCode = queryString.parse(this.props.location.search);
        const params = {
            units: 'metric',
            APPID: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
            cnt: 7,
        };

        if (city) {
            params.q = city;
            this.fetchForecast(params);
        } else {
            params.lat = geoCode.lat;
            params.lon = geoCode.lon;
            this.fetchForecast(params);
        }
    }
    componentWillReceiveProps(nextProps) {
        let geoCode = queryString.parse(this.props.location.search);
        this.fetchForecast(geoCode);
    }

    fetchForecast(params) {
        this.setState(() => {
            return {
                isLoading: true,
                forecastDataErrors: undefined,
            };
        });

        return agent.Forecast.get(params)
            .then(forecastData =>
                this.setState(() => {
                    return {
                        isLoading: false,
                        cityInfo: forecastData.city,
                        extendedForecastList: forecastData.list,
                    };
                })
            )
            .catch(err => {
                this.setState(() => {
                    return {
                        forecastDataErrors: err.response && err.response.body,
                    };
                });
            })
            .finally(() => {
                this.setState(() => {
                    return {
                        isLoading: false,
                    };
                });
            });
    }

    handleTempUnitChange() {
        let { isChecked, temperatureUnit, extendedForecastList } = this.state;

        isChecked = !isChecked;
        temperatureUnit = isChecked ? '°C' : '°F';
        extendedForecastList.map(day => {
            for (let timeOfTheDay in day.temp) {
                if (day.temp.hasOwnProperty(timeOfTheDay)) {
                    day.temp[timeOfTheDay] = convertTemp(
                        temperatureUnit,
                        day.temp[timeOfTheDay]
                    );
                }
            }
        });

        this.setState(() => {
            return {
                isChecked,
                temperatureUnit,
                extendedForecastList,
            };
        });
    }

    renderExtendedForecast() {
        const { temperatureUnit, extendedForecastList } = this.state;

        return extendedForecastList.map((listItem, i) => (
            <ExtendedForecastItem key={i}>
                <div>{getDay(listItem.dt)}</div>
                <img
                    style={{
                        height: 25,
                        width: 25,
                        padding: 5,
                    }}
                    src={require(`../../assets/img/weather-icons/${
                        listItem.weather[0].icon
                    }.svg`)}
                    alt="Weather"
                />{' '}
                <br />
                <span>
                    {Math.round(listItem.temp.max)} {temperatureUnit}
                </span>
            </ExtendedForecastItem>
        ));
    }

    renderTodaysTempInfo() {
        const { temperatureUnit, extendedForecastList } = this.state;
        // the first value of the list is todays temp info
        const todayTempInfo = extendedForecastList[0].temp || null;

        return Object.entries(todayTempInfo).map(([key, value]) => {
            if (
                key === 'morn' ||
                key === 'day' ||
                key === 'night' ||
                key === 'eve'
            ) {
                return (
                    <div key={key}>
                        {mapTimeOfDay(key)}: {Math.round(value)}
                        {temperatureUnit}
                    </div>
                );
            }
        });
    }

    renderError = () => (
        <CityNotFound>
            <h1>{this.state.forecastDataErrors.message}</h1>
            <StyledLink to="/">
                <span>
                    Back to home <FaHome />
                </span>
            </StyledLink>
        </CityNotFound>
    );

    renderForecastData = () => {
        const {
            isChecked,
            temperatureUnit,
            cityInfo,
            extendedForecastList,
        } = this.state;

        // the first value of the list is todays temp info
        const todayTempInfo = extendedForecastList[0] || null;

        return (
            <ForecastContainer>
                <ForecastCard>
                    <ForecastGeneralInfo>
                        <TempUnitSlider>
                            <Input
                                type="checkbox"
                                onChange={() => this.handleTempUnitChange()}
                            />
                            <TempUnit isChecked={isChecked}>
                                {temperatureUnit}
                            </TempUnit>
                        </TempUnitSlider>
                        <ForecastLocation>
                            <StyledLink to="/">&larr;</StyledLink>{' '}
                            {cityInfo.name}
                        </ForecastLocation>
                        <ForecastDate>
                            {getFullDate(todayTempInfo.dt)}
                        </ForecastDate>
                        <ForecastStatus>
                            {todayTempInfo.weather[0].main}
                        </ForecastStatus>
                    </ForecastGeneralInfo>
                    <ForecastTodaysTemperature>
                        <ForecastThumbnail
                            src={require(`../../assets/img/weather-icons/${
                                todayTempInfo.weather[0].icon
                            }.svg`)}
                            alt="Weather"
                        />
                        <ForecastTodaysTemperature>
                            {Math.round(todayTempInfo.temp.max)}
                        </ForecastTodaysTemperature>
                        <ForecastTemperatureUnit>
                            {temperatureUnit}
                        </ForecastTemperatureUnit>
                    </ForecastTodaysTemperature>
                    <ForecastPeriodOfDayInfo>
                        {this.renderTodaysTempInfo()}
                    </ForecastPeriodOfDayInfo>
                    <ExtendedForecast>
                        <ExtendedForecastList>
                            {this.renderExtendedForecast()}
                        </ExtendedForecastList>
                    </ExtendedForecast>
                </ForecastCard>
            </ForecastContainer>
        );
    };

    tryRenderForecast() {
        if (this.state.forecastDataErrors) {
            return this.renderError();
        }

        return this.renderForecastData();
    }

    render() {
        return this.state.isLoading ? <Spinner /> : this.tryRenderForecast();
    }
}

export default Forecast;
