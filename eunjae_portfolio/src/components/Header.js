import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hamburger_24px from '../imgs/icon-hamburger-24-px-white.png';
import icon_closeBtn from '../imgs/icon_clostBtn_28px_white.png'
import icon_closeBtn_black from '../imgs/icon_clostBtn_28px_black.png'
import Nav from './Nav';

const Header = () => {

    const [NavStatus, setNavStatus] = useState('closeNav');

    useEffect(() => {
        console.log(NavStatus);
    });

    const getFullNavStatus = (data) => {
        if(data === 'closeNav') {
            setNavStatus(data);
        }
    }

    const navigationData = () => {
        NavStatus === 'closeNav' ? setNavStatus('openNav') : setNavStatus('closeNav');
    }

    return (
        <HeaderCont openStatus={NavStatus}>
            <HeaderBox openStatus={NavStatus}>
                        {/* {NavStatus} */}
                <Logo>
                    <LogoLink to="/" openStatus={NavStatus}>logo</LogoLink>
                </Logo>
                <Nav openStatus={NavStatus} getFullNavStatus={getFullNavStatus} />
                <HamburderBtn onClick={navigationData} openStatus={NavStatus}>
                    {NavStatus === 'closeNav' ? <img src={hamburger_24px} alt="icon-hambuger-24-px-white" /> : <img src={icon_closeBtn} alt="icon_clostBtn_28px_white.png" />}
                </HamburderBtn>
                {NavStatus === 'openNav' ? <BgBtn>dsf</BgBtn> : null}
            </HeaderBox>
        </HeaderCont>
    );
};

export default Header;

const HeaderCont = styled.div`
    z-index: 1000;

    ${props => props.openStatus === 'openNav' ? `
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

    ${props => props.openStatus === 'openNav' ? `
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

    ${props => props.openStatus === 'openNav' ? `
        color: #000 !important;
    ` : null}
`;

const HamburderBtn = styled.button`
    margin-left: 20px;
    position: absolute;
    right: 0;
    top: -4px;

    img {
        width: 24px;
        transform: translateY(6px);
    }

    ${props => props.openStatus === 'openNav' ? `
        top: 30px;
        right: 40px;

        &:after{
            content: '';
            display: block;
            width: 24px;
            height: 24px;
            background: url(${icon_closeBtn_black});
            background-size: cover;
            position: absolute;
            top: 7px;
            left: 6px;
        }
    ` : null}
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
