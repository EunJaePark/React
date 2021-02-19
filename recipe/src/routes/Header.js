import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/header/Navigation';
import Search from '../components/header/Search';

const Header = () => {
    return (
        <HeaderBox>
            <HeaderConts>
                <Search />
                <NavigationBox />
            </HeaderConts>
        </HeaderBox>
    );
};

export default Header;

const HeaderBox = styled.div`
    outline: 1px solid blue;
`;

const HeaderConts = styled.div`
    outline: 1px solid red;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
`;

const NavigationBox = styled(Navigation)`
    outline: 2px solid lime !important;
    display: flex;
`;