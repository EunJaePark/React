import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavLinks = (props) => {

    const clickedNavStatus = () => {
        props.getFullNavStatus('closeNav');
    }

    return (
        <Nav openstatus={props.openStatus}>
            <NavLink to="/" openstatus={props.openStatus} onClick={clickedNavStatus}>Intro</NavLink>
            <NavLink to="/skills" openstatus={props.openStatus} onClick={clickedNavStatus}>Skills</NavLink>
            <NavLink to="/portfolio" openstatus={props.openStatus} onClick={clickedNavStatus}>Portfolio</NavLink>
            <NavLink to="/contact" openstatus={props.openStatus} onClick={clickedNavStatus}>Contact</NavLink>
        </Nav>
    );
};

export default NavLinks;

const Nav = styled.div`
    // outline: 1px solid red;
    margin-right: 40px;
    float: right;

    ${props => props.openstatus === 'openNav' ? `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    ` : null}
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

    ${props => props.openstatus === 'openNav' ? `
        padding: 0 34px 0 30px;
        font-size: 80px;
        font-weight: 900;
        color: #000 !important;
        display: block !important;

        &:hover {
            color: #fff !important;
            background-color: #000;
        }
    `: null}
`;
