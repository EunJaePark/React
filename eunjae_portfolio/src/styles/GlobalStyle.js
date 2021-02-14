import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
      ${reset};
      // @import url("https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;900&display=swap");
      @import url('https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@700&display=swap');
      * {
        font-family: "Overpass", sans-serif !important;
      }
      html {
        font-size: 100%;
      }
      body {
        font-size: 12px;
        // font-family: "Overpass", sans-serif !important;
        font-family: 'Overpass Mono', monospace;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        word-break: keep-all;
        background-color: #000;
        box-sizing: border-box;
        // padding: 2% 3%;
        color: #fff;
      
        /* position: fixed; */
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 1em;
        font-family: "Jua";
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      div,
      p,
      dl,
      dt,
      dd,
      ul,
      ol,
      li,
      form,
      fieldset,
      blockquote,
      address,
      table,
      thead,
      tbody,
      tfoot,
      tr,
      td,
      caption {
        margin: 0;
        padding: 0;
      }
      em,
      i {
        font-style: normal;
      }
      ul,
      ol,
      li {
        list-style: none;
      }
      a:link,
      a:visited {
        color: #3b3b3b;
        text-decoration: none;
      }
      strong,
      span,
      p {
        color: #3b3b3b;
      }
      
      button:focus,
      input:focus,
      select:focus {
        outline: none;
        outline-offset: unset;
      }
      input,
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: #585858 !important;
      }
      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
      
      *,
      *:after,
      *:before {
        box-sizing: border-box;
      }

      h2{
        font-size: 44px;
        font-weight: bold;
      }
`;


export default GlobalStyle;