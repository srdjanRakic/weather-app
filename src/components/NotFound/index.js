import React from 'react';
import NotFound from './styled';
import FaHome from 'react-icons/lib/fa/home';
import StyledLink from '../shared/StyledLink';

export default props => (
    <NotFound>
        <h1>{props.message || 'Sorry, page not found.'}</h1>
        <StyledLink to="/">
            <span>
                Back to home <FaHome />
            </span>
        </StyledLink>
    </NotFound>
);
