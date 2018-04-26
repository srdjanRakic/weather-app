const daysMap = {
    '0': 'Sun',
    '1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat',
};

const timeOfTheDay = {
    morn: 'Morning',
    eve: 'Evening',
    night: 'Night',
    day: 'Day',
};

const monthsMap = {
    '0': 'Jan',
    '1': 'Feb',
    '2': 'Mar',
    '3': 'Apr',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'Aug',
    '8': 'Sept',
    '9': 'Oct',
    '10': 'Nov',
    '11': 'Dec',
};

export function toCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5 / 9);
}

export function toFahrenheit(celsius) {
    return Math.round(celsius * 9 / 5 + 32);
}

export function convertTemp(unit, temp) {
    if (unit === '°F') {
        return toFahrenheit(temp);
    }

    return toCelsius(temp);
}

export function mapTimeOfDay(value) {
    return timeOfTheDay[value];
}

export function getFullDate(unixTimestmap) {
    let date = new Date(unixTimestmap * 1000);
    let day = daysMap[date.getDay()];
    let month = monthsMap[date.getMonth()] + ' ' + date.getDate();
    return `${day}, ${month}, ${date.getFullYear()}`;
}

export function getDay(unixTimestmap) {
    let date = new Date(unixTimestmap * 1000);
    let day = daysMap[date.getDay()];
    return day;
}
