import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyled = createGlobalStyle`
    ${reset};

    body {
        background-color: orange;
    }
`;

export default GlobalStyled;