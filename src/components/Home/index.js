import React, { Component } from 'react';
import {
    LocationContainer,
    LocationInput,
    LocationForm,
    SearchIcon,
    ButtonAsLink,
} from './styled';
import Message from '../shared/Message';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';

@inject('forecastStore')
@observer
class Home extends Component {
    handleSubmitCity = () => {
        this.props.history.push({
            pathname: '/forecast',
            search: `?city=${this.props.forecastStore.city}`,
        });
    };

    handleSubmitGeoLocation = async () => {
        try {
            const position = await this.props.forecastStore.getCurrentPosition();
            this.props.history.push({
                pathname: '/forecast',
                search: `?lat=${position.coords.latitude}&lon=${
                    position.coords.longitude
                }`,
            });
        } catch (err) {
            this.props.forecastStore.setError(err.message);
        }
    };

    render() {
        const { forecastErrors } = this.props.forecastStore;

        return (
            <LocationContainer>
                {forecastErrors && <Message>{forecastErrors}</Message>}
                <LocationForm onSubmit={() => this.handleSubmitCity()}>
                    <LocationInput
                        onChange={e =>
                            this.props.forecastStore.setCity(e.target.value)
                        }
                        placeholder="City"
                        type="text"
                        value={this.props.forecastStore.city}
                    />
                    <SearchIcon />
                </LocationForm>
                <span>or</span>
                <br />
                <span>
                    use my{' '}
                    <ButtonAsLink
                        onClick={() => this.handleSubmitGeoLocation()}
                    >
                        current location
                    </ButtonAsLink>
                </span>
            </LocationContainer>
        );
    }
}

const HomeWithRouter = withRouter(Home);
export default HomeWithRouter;
