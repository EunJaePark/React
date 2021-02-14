import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavLinks = (props) => {
    console.log(props);
    return (
        <Fragment>
            <NavLink to="/" openstatus={props.openStatus}>Intro</NavLink>
            <NavLink to="/skills" openstatus={props.openStatus}>Skills</NavLink>
            <NavLink to="/portfolio" openstatus={props.openStatus}>Portflio</NavLink>
            <NavLink to="/contact" openstatus={props.openStatus}>Contact</NavLink>
        </Fragment>
    );
};

export default NavLinks;

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
        font-size: 80px;
        display: block;
    `: null}
`;
