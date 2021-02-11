import React from 'react';
import styled from 'styled-components'

const Intro = () => {
    return (
        <div>
            <IntroText>
                <span>HELL</span>
                <img src="../imgs/imoge_ponytail.png" alt="imoge" />
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
        font-weight: bold;
        line-height: 130%;
        font-family: "Overpass", sans-serif;
        color: #fff;
    }

    @media (max-height: 720px) {
        top: 230px;
        transform: translate(-50%, 0);
    }
`;