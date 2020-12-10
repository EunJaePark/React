import React, {useState} from 'react';
import Title from './Title'; // Title.js에서 Title을 받아온다.

export default function Counter() {
    const [count, setCount] = useState({ value: 0, value2: 0, value3: 0 });
    const [count2, setCount2] = useState(0); // 자식 컴포넌트의 속성값이 변하지 않았을 때 굳이 렌더링을 할 필요가 없다. 이를 실습해보자.
    function onClick() {
        count.value += 1; // 상태값을 불변 변수로 지정. 아무리 버튼을 클릭해도 카운트는 증가하지 않게 된다.
        setCount({...count, value: count.value + 1}); // 전개연산자를 이용해 객체를 불변 변수로 관리하는 방법이다. 위에서 { value: 0, value2: 0, value3: 0 } 이렇게 3개의 값이 있을 때, 전개 연산자 문법에서 세 가지 값을 풀어놓고 변경하고자 하는 값을 덮어쓰는 방식이다.
        // setCount(count); // count의 값이 새로 할당되면, 아래의 사용하는 Title컴포넌트도 함께 다시 렌더링이 될 것이다.
    }
    function onClick2() {
        setCount2(count2 + 1); 
    }
    return (
        <div>
            <Title title={`현재 카운트: ${count.value}`} />
            <button onClick={onClick}>증가</button>
            <button onClick={onClick2}>증가2</button>
        </div>
    )
}