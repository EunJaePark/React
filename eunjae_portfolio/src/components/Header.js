import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderBox>
            <Logo>
                <LogoLink to="/">logo</LogoLink>
            </Logo>
            <Nav>
                <NavLink to="/">Intro</NavLink>
                <NavLink to="/skills">Skills</NavLink>
                <NavLink to="/portfolio">Portflio</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </Nav>
        </HeaderBox>
    );
};

export default Header;

const HeaderBox = styled.div`
    outline: 1px solid blue;
    margin-top: 34px;
    * {
        display: inline-block;
    }
`;

const Logo = styled.div`
    outline: 1px solid lime;
`;

const Nav = styled.div`
    outline: 1px solid red;
    float: right;
`;

const LogoLink = styled(Link)`
    color: #fff !important;
    font-size: 18px;
    font-weight: 600;
`;

const NavLink = styled(Link)`
    margin-left: 20px;
    padding: 1px 8px 0;
    color: #fff !important;
    font-size: 18px;
    font-weight: 600;
    font-family: "Overpass", sans-serif;
    &:hover {
        color: #000 !important;
        background-color: #fff;
    }
`;
