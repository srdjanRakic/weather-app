import React from 'react';
import Routes from '../../routes';
import { Container, ContentWrapper } from './styled';

const App = () => (
    <React.Fragment>
        <Container>
            <ContentWrapper>
                <Routes />
            </ContentWrapper>
        </Container>
    </React.Fragment>
);

export default App;
