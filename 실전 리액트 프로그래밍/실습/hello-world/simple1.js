// 좋아요 버튼(클릭하면 토글되게 만들어보자)
function LikeButton() {
    const [liked, setLiked] = React.useState(false);
    // 위의 React라는 변수는 [liked, setLiked]는 simple1.html에서 이 js파일이 실행될 때 전역변수로 노출이 되어 쓸 수 있다.
    // useState()함수는 컴포넌트 상태값을 추가할 때 사용한다.
    
    const text = liked ? '좋아요 취소' : '좋아요';
    return React.createElement(
        'button', // html에 button에 해당하는 태그가 생성된다.
        {onClick: () => setLiked(!liked)}, // 생성하려는 button태그에 이벤트핸들러 생성해줌.
        text, // button태그의 children값을 입력.
    )
    // createElement()함수는 '리액트 요소'를 반환한다. 리엑트에서는 UI를 표현하는 가장 작은 단위가 '리액트 요소'라고 이해하면 된다.
}

// --- root1, root2, root3이 생성되고 각자 아래에 버튼이 생성됨. ---
// const domContainer1 = document.getElementById('root1');
// ReactDOM.render(React.createElement(LikeButton), domContainer1) // html에서 이 js 파일이 실행될 때 전역변수로 노출이 된다.
// // domContainer에 렌더링 하겠다는 의미.
// const domContainer2 = document.getElementById('root2');
// ReactDOM.render(React.createElement(LikeButton), domContainer2) 
// const domContainer3 = document.getElementById('root3');
// ReactDOM.render(React.createElement(LikeButton), domContainer3) 

// --- root1속에 3개의 버튼이 생성됨. ---
const domContainer1 = document.getElementById('root1');
ReactDOM.render(
    React.createElement(
        'div',
        null,
        React.createElement(LikeButton),
        React.createElement(LikeButton),
        React.createElement(LikeButton),
    ),
    domContainer1,
); // html에서 이 js 파일이 실행될 때 전역변수로 노출이 된다.
// domContainer에 렌더링 하겠다는 의미.






// ----------------------------------------------

// React.createElement(
//     'div', 
//     null,
//     React.createElement('p', null, 'hello'),
//     React.createElement('p', null, 'wrold'),
// );


