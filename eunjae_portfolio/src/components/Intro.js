import React from 'react';
import styled from 'styled-components'
import imoge from '../imgs/imoge_ponytail.png'

const Intro = () => {
    return (
        <div>
            <BgBox></BgBox>
            <IntroText>
                <span>HELL</span>
                <img src={imoge} alt="imoge" />
                <span>, I'M</span>
                <p>FRONT-END</p>
                <p>DEVELOPER</p>
            </IntroText>
            <Copyright>
                <span>Copyright ⓒ 2021</span>
                <span>ParkEunJae all rights reserved.</span>
            </Copyright>
        </div>
    );
};

export default Intro;

const BgBox = styled.div`
    border: 2px solid orange;
    position: absolute;
`;

const IntroText = styled.div`
    outline: 1px solid pink;
    text-align: center;
    display: inline-block;
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    span,
    p {
        font-size: 88px;
        font-weight: 900;
        line-height: 130%;
        font-family: "Overpass", sans-serif;
        color: #fff;
    }

    img {
        width: 118px;
        transform: translate(-5px, 30px);
    }

    @media (max-height: 720px) {
        top: 230px;
        transform: translate(-50%, 0);
    }
`;

const Copyright = styled.div`
    // outline: 1px solid red;
    width: calc(100vw - 80px);
    max-width: 1200px;
    position: absolute;
    bottom: 50px;

    span {
        color: #fff;
        &:first-child {
            float: left;
        }
        &:last-child {
            float: right;
        }
    }
`;