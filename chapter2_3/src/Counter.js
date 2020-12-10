import React, {useState} from 'react';
import Title from './Title'; // Title.js에서 Title을 받아온다.

export default function Counter() {
    const [count, setCount] = useState({ value: 0});
    function onClick() {
        count.value += 1; 
        setCount({...count, value: count.value + 1});
    }
    return (
        <div>
            {/* count.value > 0 && 를 줘서 조건만족시에만 렌더링이 되도록 해줬다. */}
            {/* &&을 이용하면 조건부 렌더링이 된다. &&의 왼쪽에 있는 조건이 모두 만족되어야만 뒤에 있는 것이 렌더링된다.  */}
            {count.value > 0 && <Title title={`현재 카운트: ${count.value}`} />} 
            <button onClick={onClick}>증가</button>
        </div>
    )
}