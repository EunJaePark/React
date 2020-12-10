import React, {useState} from 'react';
import Counter from './Counter'
// 2-2강) 컴포넌트의 속성값과 상태값
// let color = 'red';
function App() {
  const [color, setColor] = useState('red');
  function onClick() {
    // color = 'blue';
    setColor('blue');
  }
  return (
    <div>
      <h1>2-2강) 컴포넌트의 속성값과 상태값</h1>
      <span>좋아요 버튼을 클릭하면 버튼색이 바뀌게 해보자.</span><br/>

      <Counter/>
      <Counter/> 
      {/* 같은 컴포넌트를 여러 번 사용할 수도 있다. 같은 컴포넌트라고 하더라도 각각의 메모리 공간이 있기 때문에, 같은 컴포넌트를 여러번 사용해도 각각의 상태값을 유지할 수 있다.  */}
      <button style={{ backgroundColor: color }} onClick={onClick}>
        좋아요
      </button>
    </div>
  );
}

export default App;
