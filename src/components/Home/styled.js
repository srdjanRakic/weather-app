import styled from 'styled-components';
import FaSearch from 'react-icons/lib/fa/search';
import { media } from '../shared/MediaQueries';

export const LocationContainer = styled.div`
    flex-direction: column;
    box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    text-align: center;

    // width
    ${media.desktop`width: 50%;`}
    ${media.laptop`width: 60%;`}
    ${media.tablet`width: 100%;`}
    ${media.mobileL`width: 100%;`}

    // height
    ${media.desktop`height: 50%;`}
    ${media.laptop`height: 60%;`}
    ${media.tablet`height: 100%;`}
    ${media.mobileL`height: 100%;`}
`;

export const LocationForm = styled.form`
    position: relative;
    border-bottom: 2px solid #4e5c5f;
    margin: 15px 0px;
`;

export const LocationInput = styled.input`
    width: 80%;
    border: 0;
    outline: 0;
    background: transparent;
    text-align: center;
    font-weight: 300;
    font-size: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
`;

export const SearchIcon = styled(FaSearch)`
    right: 1px;
    position: absolute;
    top: 10px;
    pointer-events: none;
`;

export const ButtonAsLink = styled.button`
    font-size: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    text-decoration: underline dashed #4e5c5f;
    cursor: pointer;
`;
