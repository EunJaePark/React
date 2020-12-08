import React from 'react';
import ReactDOM from 'react-dom';
import Box from './Box';
import Button from './Button';

ReactDOM.render(
  <div>
    <Button size="big" />
    <Button size="small" />
    <Box size="big" />
    <Box size="small" />
  </div>,
  document.getElementById('root'),
);


// ReactDOM.render(
//   // StrictMode는 개발환경에서 동작하는데, 리액트에서 잘못 사용하는 것에 대해 잡아내기 위해 사용하는 것이다. 
//   <React.StrictMode> 
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

