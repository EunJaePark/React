import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import hamburger_24px from '../imgs/icon-hamburger-24-px-white.png';
// import icon_closeBtn from '../imgs/icon_clostBtn_28px_black.png'
// import icon_closeBtn_black from '../imgs/icon_clostBtn_28px_black.png'
import icon_line_black from '../imgs/icon_line(hamburger)_20px_black.png'
import Nav from './Nav';

const Header = () => {

    const [NavStatus, setNavStatus] = useState('closeNav');

    useEffect(() => {
        console.log(NavStatus);
    });

    const clickLogo = () => {
        setNavStatus('closeNav');
        getFullNavStatus(NavStatus);
    }

    const getFullNavStatus = (data) => {
        if(data === 'closeNav') {
            setNavStatus(data);
        }
    }

    const navigationData = () => {
        NavStatus === 'closeNav' ? setNavStatus('openNav') : setNavStatus('closeNav');
    }

    return (
        <HeaderCont openstatus={NavStatus}>
            <HeaderBox openstatus={NavStatus}>
                        {/* {NavStatus} */}
                <Logo>
                    <LogoLink to="/" onClick={clickLogo} openstatus={NavStatus}>logo</LogoLink>
                </Logo>
                <Nav openStatus={NavStatus} getFullNavStatus={getFullNavStatus} />
                <HamburderBtn onClick={navigationData} openstatus={NavStatus}>
                    {NavStatus === 'closeNav' ? <img src={hamburger_24px} alt="icon-hambuger-24-px-white" /> : <img src={icon_line_black} alt="icon_clostBtn_28px_white.png" />}
                    {NavStatus === 'closeNav' ? null : <img src={icon_line_black} alt="icon_clostBtn_28px_white.png" />}
                </HamburderBtn>
                {NavStatus === 'openNav' ? <BgBtn>dsf</BgBtn> : null}
            </HeaderBox>
        </HeaderCont>
    );
};

export default Header;

const HeaderCont = styled.div`
    z-index: 1000;

    ${props => props.openstatus === 'openNav' ? `
        width: 100vw;
        background-color: #fff;
        position: absolute; 
        top: 0;
        left: 0;
        transition: background .3s ease-out;
    ` : null}
`;

const HeaderBox = styled.div`
    margin-top: 34px;
    position: relative;

    * {
        display: inline-block;
    }

    ${props => props.openstatus === 'openNav' ? `
        width: 100%;
        max-width: 1280px;
        height: 100vh;
        min-height: 720px;
        margin: 0;
        padding: 34px 40px 0;
        z-index: 1000;
        left: 50%;
        transform: translateX(-50%);
    ` : null}
`;

const Logo = styled.div`
    outline: 1px solid lime;
`;

const LogoLink = styled(Link)`
    color: #fff !important;
    font-size: 18px;
    font-weight: 600;

    ${props => props.openstatus === 'openNav' ? `
        color: #000 !important;
    ` : null}
`;

const HamburderBtn = styled.button`
    // outline: 1px solid red !important;
    margin-left: 20px;
    position: absolute;
    right: 0;
    top: -4px;    

    ${props => props.openstatus === 'openNav' ? `
        // outline: 1px solid red !important;
        width: 36px;
        height: 32px;
        padding: 1px 6px;
        top: 30px;
        right: 40px;
    ` : null} 


    img {
        width: 24px;
        transform: translateY(6px);

        &:first-child {
            ${props => props.openstatus === 'openNav' ? css`
                animation: ${closeBtnAnimation1};
            ` : null}
        }
        &:last-child {
            ${props => props.openstatus === 'openNav' ? css`
                animation: ${closeBtnAnimation2};
            ` : null}
        }
    }
    

`;


const moveLine1 = keyframes`
    from {
        transform: rotate(0deg) translateY(0);
    }
    to {
        height: 2px;
        transform: rotate(45deg) translateY(2px);
    }
`;
const moveLine2 = keyframes`
    from {
        transform: rotate(0deg) translate(13px, -10px);
    }
    to {
        height: 2px;
        transform: rotate(-45deg) translate(13px, -15px);
    }
`;

const closeBtnAnimation1 = props => css`
    ${moveLine1} .7s ease forwards;
`;
const closeBtnAnimation2 = props => css`
    ${moveLine2} .7s ease forwards;
`;

const BgBtn = styled.button`
    border: 2px solid #000;
    border-radius: 20px;
    width: 84px;
    height: 24px;
    color: #000;
    position: absolute;
    bottom: 60px;
    left: 40px;
`;
