import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Intro from './components/Intro';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  return (
    <AppCont>
      <GlobalStyle />
      <BrowserRouter>
        <Header /> 
        {/* header.js의 <Link>태그도 Router안에 위치해야 하기 때문에 App.js의 <BrowserRouter> 안에 위치시켜 준 것임. */}
        {/* https://ssungkang.tistory.com/entry/React-react%EC%9D%98-%EB%84%A4%EB%B9%84%EA%B2%8C%EC%9D%B4%EC%85%98-react-router-dom */}
        <Switch>
          <Route exact path="/" component={Intro} />
          <Route path="/skills" component={Skills} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </AppCont>
  );
}

export default App;

const AppCont = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;900&display=swap");
  width: 100%;
  max-width: 1280px;
  height: calc(100vh - 34px);
  min-height: 720px;
  margin: 0 auto;
  font-family: "Overpass", sans-serif !important;
`;