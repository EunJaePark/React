import React from 'react';
import styled from 'styled-components';
import imoge from '../imgs/imoge_shadow.png'
import icon_github_white from '../imgs/icon_white_github.png'
import icon_mail_white from '../imgs/icon_white_mail.svg'
import icon_phone_white from '../imgs/icon_white_phone.svg'

const Contact = () => {
    return (
        <div>
            <ContactCont>
                <Title>Contact me</Title>
                <ContBox>
                    <ImogeBox>
                        <img src={imoge} alt="imoge_yellow" />
                    </ImogeBox>
                    <ContText>
                        <li>
                            <img src={icon_github_white} alt="github_icon" />
                            <address>
                                <a href="https://github.com/EunJaePark" target="blank">@EunJaePark</a>
                            </address>
                        </li>
                        <li>
                            <img src={icon_mail_white} alt="mail_icon" />
                            <address>
                                <a href="mailto:design0728@naver.com">design0728@naver.com</a>
                            </address>
                        </li>
                        <li>
                            <img src={icon_phone_white} alt="phone_icon" />
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
    margin-top: 58px;

    img {
        width: 130px;
    }
`;

const ContText = styled.ul`
    margin-left: 44px;
    display: block;

    li + li{
        margin-top: 30px;
    }

    li{
        height: 28px;

        &:first-child{
            img{
                width: 34px;
                height: 34px;
                margin-right: 3px;
                transform: translate(-3px, -3px);
            }
        }

        &:nth-child(2),
        &:nth-child(3) {
            img {
                margin-right: 10px;
            }
        }
    }

    address {
        // position: relative;

        // &:before {
        //     content: '';
        //     display: block;
        //     width: 0;
        //     height: 100%;
        //     position: absolute;
        //     top:0;
        //     left:0;
        // }

        &: hover{
            color: #000 !important;
            background-color: #fff;

            // &:before {
            //     width: 100%;
            //     background-color: #fff;
            //     transition: all .5s ease-out;
            // }
        }
    }

    a {
        width: 158px;
        padding: 4px 8px 0;
        color: #fff !important;
        font-size: 13px;
        font-weight: bold;
        z-index: 1000;

        &: hover{
            color: #000 !important;
            // transition: all .3s ease-out;
        }
    }

    img {
        width: 28px;
    }
`;

const ImogeBox = styled.div`
    border-radius: 50%;
    width: 130px;
    height: 130px;
    margin-top: 6px;
    background-color: #ffd301;

    img {
        width: 80%;
        height: 80%;
        transform: translate(10%, 10%);
    }
`;