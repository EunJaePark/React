import React from 'react';
import styled from 'styled-components';

const Contact = () => {
    return (
        <div>
            <ContactCont>
                <Title>Contact me</Title>
                <ContBox>
                    <img src="../imgs/imoge_bg_yellow.png" alt="imoge_yellow" />
                    <ContText>
                        <li>
                            <img src="../imgs/icon_white_github.png" alt="github_icon" />
                            <address>
                                <a href="https://github.com/EunJaePark" target="blank">@EunJaePark</a>
                            </address>
                        </li>
                        <li>
                            <img src="../imgs/icon_white_mail.svg" alt="mail_icon" />
                            <address>
                                <a href="mailto:design0728@naver.com">design0728@naver.com</a>
                            </address>
                        </li>
                        <li>
                            <img src="../imgs/icon_white_phone.svg" alt="phone_icon" />
                            <address>
                                <a href="tel:01063141371">010.6314.1371</a>
                            </address>
                        </li>
                    </ContText>
                </ContBox>
            </ContactCont>
        </div>
    );
};

export default Contact;

const ContactCont = styled.div`
    outline: 1px solid red;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    * {
        display: flex;
    }

    @media (max-height: 720px) {
        top: 230px;
        transform: translate(-50%, 0);
    }
`;

const Title = styled.h2`

`;

const ContBox = styled.div`
    outline: 1px solid lime;
    margin-top: 58px;

    img {
        width: 130px;
    }
`;

const ContText = styled.ul`
    margin-left: 34px;
    background-color: rgba(255, 255, 255, .2);
    display: block;

    li + li{
        margin-top: 30px;
    }

    a {
        padding: 0 8px;
        color: #fff !important;
        font-size: 13px;
        font-weight: bold;

        &: hover{
            color: #000 !important;
            background-color: #fff;
        }
    }

    img {
        width: 28px;
    }
`;