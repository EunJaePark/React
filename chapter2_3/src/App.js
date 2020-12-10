import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

function App() {
  return (
    <>
      <p>안녕</p>
      <Counter />
      {ReactDOM.createPortal(
          <div>
            <p>안녕하세요</p>
            <p>리액트 portal을 연습하고 있습니다.</p>
          </div>,
          document.getElementById('something'),
      )}
    </>
  );
}

export default App;
