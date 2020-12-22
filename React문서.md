## 1. Hello World
가장 단순한 React는 다음과 같이 생겼다.
```javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```
위 코드는 "Hello, world!"라는 제목을 보여준다.

<br/>

## 2. JSX 소개
### JSX란?
React에서는 이벤트가 처리되는 방식, 시간에 따라 state가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등 렌더링 로직이 본질적으로 다른 UI 로직과 연결된다는 사실을 받아들인다.

React는 별도의 파일에 마크업과 로직을 넣어 기술을 인위적으로 분리하는 대신, 둘 다 포함하는 `컴포넌트`라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리한다. 

React는 JSX 사용이 필수는 아니지만, JavaScript 코드 안에서 UI 관련 작업을 할 때 시각적으로 더 도움이 된다. 또한 더욱 도움이 되는 에러 및 경고 메시지를 표시할 수 있게 해준다.

### JSX에 표현식 포함하기
```javascript
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
위 코드는 `name`이라는 변수 선언 후, 중괄호로 감싸 JSX 안에 사용한 것이다.

JSX의 중괄호 안에는 유효한 모든 [JavaScript표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%ED%91%9C%ED%98%84(%EC%8B%9D))을 넣을 수 있다.
`2 + 2`, `user.firstName`, `formatName(user)` 등은 모두 유효한 JavaScript 표현식이다.

아래 예시에서는 JavaScript 함수 호출의 결과인 `formatName(user)`을 `<h1>` 엘리먼트에 포함했다.
```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
> 가독성을 좋게 하기 위해 JSX를 여러 줄로 나눈 것이다. 이 작업을 수행할 때 자동 세미콜론(`;`) 삽입을 피하기 위해 괄호로 묶는 것이 좋다.

### JSX도 표현식이다.
컴파일이 끝나면 JSX 표현식이 정규 JavaScript 함수 호출이 되고 JavaScript 객체로 인식된다.
즉, JSX를 `if` 구문 및 `for` loop 안에 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환할 수 있다.
```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX 속성 정의









