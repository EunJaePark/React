import React from 'react';
import styled from 'styled-components'
import imoge from '../imgs/imoge_ponytail.png'

const Intro = () => {
    return (
        <div>
            <IntroText>
                <span>HELL</span>
                <img src={imoge} alt="imoge" />
                <span>, I'M</span>
                <p>FRONT-END</p>
                <p>DEVELOPER</p>
            </IntroText>
        </div>
    );
};

export default Intro;

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