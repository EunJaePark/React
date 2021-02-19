import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../asset/imgs/logo.png';

const Navigation = () => {

    return (
        <Fragment>
            <Logo>
                <Link to="/">
                    <img src={logo} alt="해먹남녀 로고 이미지" />
                </Link>
            </Logo>
            <Nav>
                <Link to="/recipelist" category="떡볶이">떡볶이</Link>
                <Link to="/recipelist" category="백종원">백종원</Link>
                <Link to="/recipelist" category="초간단요리">초간단요리</Link>
            </Nav>
        </Fragment>
    );
};

export default Navigation;

const Logo = styled.h1`
    outline: 1px solid red;
`;

const Nav = styled.div`
    background-color: rgba(0, 0, 0, .1);
`;