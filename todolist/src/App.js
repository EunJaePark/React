import React, { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [desc, setDesc] = useState('');
  const [showOdd, setShowOdd] = useState(false);
  function onAdd() {
    const todo = {id: currentId, desc};
    setCurrentId(currentId+1);
    setTodoList([...todoList, todo]); // ...은 전개연산자.
  }
  function onDelete(e) {
    const id = Number(e.target.dataset.id);
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }
  function onSaveToServer() {}
  return (
    <div>
      <h1>2-1) 리액트를 사용한 코드의 특징(html코드와 비교)</h1>
      <h3>할 일 목록</h3>
      <ul>
        {todoList
        .filter((_, index) => (showOdd ? index % 2 === 0 : true))
        .map(todo => (
          <li key={todo.id}>
            <span>{todo.desc}</span>
            <button data-id={todo.id} onClick={onDelete}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <input type="text" value={desc} onChange={e => setDesc(e.target.value)} />
      <button onClick={onAdd}>추가</button>
      <button onClick={() => setShowOdd(!showOdd)}>홀수 아이템만 보기 ON/off</button>
      <button onClick={onSaveToServer}>서버에 저장</button>
    </div>
  );
}

export default App;




// // 전개 연산자
// const arr = [1, 2, 3];
// const arr2 = [...arr];
// // const arr2 = [...arr];은 [arr[0], arr[1], arr[2]]이라고 나타낸 것과 같은 의미가 된다.
// const arr2 = [arr[0], arr[1], arr[2]];