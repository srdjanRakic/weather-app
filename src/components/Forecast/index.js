import React, { Component } from 'react';
import { getFullDate, getDay, mapTimeOfDay } from '../../utils/helpers';
import qs from 'qs';
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
} from './styled';
import Spinner from '../shared/Spinner';
import NotFound from '../NotFound';
import StyledLink from '../shared/StyledLink';
import { observer, inject } from 'mobx-react';

@inject('forecastStore')
@observer
export default class Forecast extends Component {
    componentDidMount() {
        let city = qs.parse(this.props.location.search.slice(1)).city;
        let geoLocation = {
            lat: qs.parse(this.props.location.search.slice(1)).lat,
            lon: qs.parse(this.props.location.search.slice(1)).lon,
        };

        if (city) {
            this.props.forecastStore.fetchForecastByCity(city);
        }

        if (geoLocation.lat && geoLocation.lon) {
            this.props.forecastStore.fetchForecastByGeoLocation(geoLocation);
        }
    }

    renderExtendedForecast() {
        const {
            temperatureUnit,
            extendedForecastList,
        } = this.props.forecastStore;

        return extendedForecastList.map((listItem, i) => (
            <ExtendedForecastItem key={i}>
                <div>{getDay(listItem.dt)}</div>
                <ForecastThumbnail
                    height={25}
                    width={25}
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
        const {
            temperatureUnit,
            extendedForecastList,
        } = this.props.forecastStore;
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

    renderErrors = () => {
        if (this.props.forecastStore.forecastErrors) {
            return (
                <NotFound
                    message={this.props.forecastStore.forecastErrors.message}
                />
            );
        }

        return <NotFound message="Something went wrong, please try again." />;
    };

    renderForecastData = () => {
        const {
            temperatureUnit,
            cityInfo,
            extendedForecastList,
        } = this.props.forecastStore;

        // the first value of the list is todays temp info
        const todayTempInfo = extendedForecastList[0] || null;
        return (
            <ForecastContainer>
                <ForecastCard>
                    <ForecastGeneralInfo>
                        <TempUnitSlider>
                            <Input
                                type="checkbox"
                                onChange={() =>
                                    this.props.forecastStore.handleTempUnitChange()
                                }
                            />
                            <TempUnit isChecked={temperatureUnit === '°F'}>
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

    render() {
        const {
            isLoadingForecast,
            extendedForecastList,
            forecastErrors,
        } = this.props.forecastStore;

        if (isLoadingForecast && extendedForecastList.length === 0) {
            return <Spinner />;
        }

        if (forecastErrors) {
            return this.renderErrors();
        }

        if (extendedForecastList.length > 0) {
            return this.renderForecastData();
        } else {
            return <Spinner />;
        }
    }
}
