import styled from 'styled-components';

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50;
    width: 800px;
    margin: 0 auto;
    background: white;
    text-align: center;
`;

export const ForecastGeneralInfo = styled.div`
    margin-bottom: 20px;
`;

export const ForecastLocation = styled.div`
    font-size: 24px;
    line-height: 1.2;
`;

export const ForecastDate = styled.div`
    font-size: 16px;
    line-height: 2;
`;

export const ForecastStatus = styled.div`
    font-size: 13px;
    line-height: 1.4;
`;

export const TempUnitSlider = styled.label`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    border-radius: 25px;
    background-color: #ffffff;
    border: 1px solid black;
    float: right;
`;

export const Input = styled.input`
    display: none;
`;

export const TempUnit = styled.div`
    position: absolute;
    border-radius: 50%;
    transition: 0.1s ease;
    width: 18px;
    height: 18px;
    top: 1px;
    left: ${props => (props.isChecked ? '50%' : '1px')};
    text-align: center;
`;

export const ForecastContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 632px;
    margin: auto;
    height: 100%;
    width: 100%;
`;

export const ForecastCard = styled.div`
    padding: 20px 16px 24px 16px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
`;

export const ForecastTodaysInfo = styled.div`
    color: #212121;
    float: left;
`;

export const ForecastTemperatureUnit = styled.div`
    float: left;
`;

export const ForecastTodaysTemperature = styled.div`
    float: left;
    font-size: 74px;
    color: #e59483;
`;

export const ForecastThumbnail = styled.img`
    height: 80px;
    padding-left: 22px;
    padding-right: 22px;
`;

export const ForecastPeriodOfDayInfo = styled.div`
    margin-left: 10px;
    padding-left: 5px;
    padding-top: 2px;
    line-height: 22px;
    font-weight: lighter;
    color: #e59483;
`;

export const ExtendedForecast = styled.div`
    padding-top: 10px;
    clear: both;
`;

export const ExtendedForecastList = styled.div`
    padding: 0;
    margin: 15px 0 5px 0;
`;

export const ExtendedForecastItem = styled.div`
    display: inline-block;
    height: 90px;
    width: 73px;
    text-align: center;
    line-height: 1;
`;

export const CityNotFound = styled.div`
    display: inline-block;
    text-align: center;
`;
