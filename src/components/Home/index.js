import React, { Component } from 'react';
import {
    LocationContainer,
    LocationInput,
    LocationForm,
    SearchIcon,
    ButtonAsLink,
} from './styled';
import { withRouter } from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            location: '',
        };
    }
    handleSubmitCity = () => {
        this.props.history.push({
            pathname: '/forecast',
            search: `?city=${this.state.city}`,
        });
    };
    handleUpdateCity = e => {
        let city = e.target.value;
        this.setState(() => {
            return {
                city,
            };
        });
    };
    getUserGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.props.history.push({
                    pathname: '/forecast',
                    search: `?lat=${position.coords.latitude}&lon=${
                        position.coords.longitude
                    }`,
                });
            },
            error => {
                console.error(JSON.stringify(error));
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 27000 }
        );
    };

    render() {
        return (
            <LocationContainer>
                <LocationForm onSubmit={e => this.handleSubmitCity(e)}>
                    <LocationInput
                        onChange={this.handleUpdateCity}
                        placeholder="City"
                        type="text"
                        value={this.state.city}
                    />
                    <SearchIcon />
                </LocationForm>
                <span>or</span>
                <br />
                <span>
                    use my{' '}
                    <ButtonAsLink onClick={() => this.getUserGeoLocation()}>
                        current location
                    </ButtonAsLink>
                </span>
            </LocationContainer>
        );
    }
}

const HomeWithRouter = withRouter(Home);
export default HomeWithRouter;
