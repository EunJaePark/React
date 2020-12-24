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
속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있다.
```javascript
const element = <div tabindex="0"></div>;
```
중괄호를 사용해 어트리뷰트에 JavaScript 표현식을 삽입할 수도 있다.
```javascript
const element = <img src={user.avatarUrl}></img>;
```
어트리뷰트에 JavaScript 표현식을 삽입할 때는 중괄호 주변에 따옴표를 입력하지 않는다.

### JSX로 자식 정의
태그가 비어있다면 XML처럼 `/>`를 이용해 바로 닫아야 한다.
```javascript
const element = <img src={user.avatarUrl} />;
```
JSX 태그는 자식을 포함할 수 있다.
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX는 주입 공격을 방지한다
JSX에 사용자 입력을 삽입하는 것은 안전하다.
```javascript
const title = response.potentiallyMaliciousInput;
// 이것은 안전하다.
const element = <h1>{title}</h1>;
```
기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 [이스케이프](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html)하므로, 애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않는다. 모든 항목은 렌더링 되기 전에 문자열로 변환된다. 이런 특성으로 인해 [XSS(cross-site-scripting)](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85)공격을 방지할 수 있다.

### JSX는 객체를 표현한다
Babel은 JSX를 `React.createElement()` 호출로 컴파일한다.

아래의 두 예시는 동일하다.
```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
`React.createElement()`는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행하며, 기본적으로 다음과 같은 객체를 생성한다.
```javascript
// 주의: 다음 구조는 단순화되어있다
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
이러한 객체를 `React 엘리먼트`라고 하며, 이를 화면에 표시하려는 항목에 대한 설명으로 생각할 수 있다. React는 이러한 객체를 읽은 후 DOM을 구성하고 최신으로 유지한다.
> ES6 및 JSX 코드가 올바르게 표시되도록 편집기에 [“Babel” 언어 설정](https://babeljs.io/docs/en/editors)을 사용하는 것을 권장한다.

<br/>

## 3. 엘리먼트 렌더링
**엘리먼트는 React 앱의 가장 작은 단위다.**

엘리먼트는 화면에 표시할 내용을 기술한다.
```javascript
const element = <h1>Hello, world</h1>;
```
브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반객체(plain object)이며 쉽게 생성할 수 있다. React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트한다.

### DOM에 엘리먼트 렌더링하기
HTML 파일 어딘가에 `<div>`가 있다고 가정해보자.
```javascript
<div id="root"></div>
```
이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이것을 "루트(root)" DOM 노드라고 부른다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있다.
React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드가 있을 수 있다.

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 `ReactDOM.render()`로 전달하면 된다.
```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
위 코드는 화면에 "Hello, world"를 찍어낸다.

### 렌더링 된 엘리먼트 업데이트하기
React 엘리먼트는 [불변객체](https://ko.wikipedia.org/wiki/%EB%B6%88%EB%B3%80%EA%B0%9D%EC%B2%B4)다. 엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없다. 엘리먼트는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여준다.

UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 `ReactDOM.render()`로 전달하는 것이다.

예시로 똑딱거리는 시계를 살펴보자.
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
위 함수는 `setInterval()` 콜백을 이용해 초마다 `ReactDOM.render()`를 호출한다.
> 실제로 대부분의 React 앱은 `ReactDOM.render()`를 한 번만 호출한다. 다음장(4. Component와 Props)에서는 이와 같은 코드가 유상태 컴포넌트에 어떻게 캡슐화 되는지 알아볼 것이다.

### 변경된 부분만 업데이트하기
ReactDOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는에 필요한 경우에만 DOM을 업데이트한다.

위의 예시 코드인 시계 코드를 살펴보면, 매초 전체 UI를 다시 그리도록 엘리먼트를 만들었지만, React DOM은 내용이 변경된 텍스트 노드만 업데이트 했음을 알 수 있다. 

특정 시점에 UI가 어떻게 보일지 고민하는 이런 접근법은 시간의 변화에 따라 UI가 어떻게 변화할지 고민하는 것보다 더 많은 수의 버그를 없앨 수 있다.

<br/>

## 4. Component와 Props
컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있다.

개념적으로 컴포넌트는 JavaScript 함수와 유사하다. "props"라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.

### 함수 컴포넌트와 클래스 컴포넌트
컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수를 작성하는 것이다.
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
이 함수는 데이터를 가진 하나의 "props"(props: 속성을 나타내는 데이터) 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트다. 이러한 컴포넌트는 JavaScript 함수이기 때문에 말 그대로 **함수 컴포넌트**라고 호칭한다.

또한 [ES6 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)를 사용해 컴포넌트를 정의할 수 있다.
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
React의 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일하다.

### 컴포넌트 렌더링
이전까지는 React 엘리먼트는 DOM 태그로 나타냈다.
```javascript
const element = <div />;
```
React 엘리먼트는 사용자 정의 컴포넌트로 나타낼 수 있다.
```javascript
const element = <Welcome name="Sara" />;
````
React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 객체를 **Props**라고 한다.

다음은 페이지에 "Hello, Sara"를 렌더링하는 예시이다.
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
위 예시에서는 다음과 같은 일들이 일어난다.

1. `<Welcome name="Sara" />` 엘리먼트로 `ReactDOM.render()`를 호출한다.
2. React는 `{name: 'Sara'}`를 props로 하여 `Welcom` 컴포넌트를 호출한다.
3. `Welcome` 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트를 반환한다.
4. React DOM은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트한다.
> **컴포넌트의 이름은 항상 "대문자"로 시작한다.**   
> 소문자로 시작하는 경우에는 `<div>`, `<span>`과 같은 내장 컴포넌트를 뜻하게 된다.    
> [참고](https://ko.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)    

### 컴포넌트 합성
컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있다. 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미한다. React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 컴포넌트로 표현된다.

예를 들어 `Welcome`을 여러 번 렌더링하는 `App` 컴포넌트를 만들 수 있다.
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
일반적으로 새 React 앱은 최상위에 단일 `App` 컴포넌트를 가지고 있다. 하지만 기존 앱에 React를 통합하는 경우에는 `Button`과 같은 작은 컴포넌트부터 시작해서 뷰 계층의 상단으로 올라가면서 점진적으로 작업해야 할 수 있다.

### 컴포넌트 추출
컴포넌트를 여러 개의 작은 컴포넌트로 나누는 것을 두려워하지 마라.

다음 `Comment` 컴포넌트를 살펴보자.
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
이 컴포넌트는 `author`(객체), `text`(문자열) 및 `date`(날짜)를 props로 받은 후 소셜 미디어 웹 사이트의 코멘트를 나타낸다.

이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있고, 각 구셩요소를 개별적으로 재사용하기도 어렵다. 따라서, 몇 가지 컴포넌트를 추출해보자.

#### `Avatar`를 추출해보자.
```javascript
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
`Avatar`는 자신이 `Comment` 내에서 렌더링 된다는 것을 알 필요가 없다. 따라섯 props의 이름을 `author`에서 더욱 일반화된 `user`로 변경했다.

props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장한다.

이제 `Comment`가 살짝 단순해 졌다.
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

#### 다음으로 `Avatar` 옆에 사용자의 이름을 렌더링하는 `UserInfo` 컴포넌트를 추출해보자.
```javascript
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

`Comment`가 더욱 단순해졌다.
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

> 완성된 코드.
> ```javascript
> function formatDate(date) {
>  return date.toLocaleDateString();
>}
>
>function Avatar(props) {
>  return (
>    <img
>      className="Avatar"
>      src={props.user.avatarUrl}
>      alt={props.user.name}
>    />
>  );
>}
>
>function UserInfo(props) {
>  return (
>    <div className="UserInfo">
>      <Avatar user={props.user} />
>      <div className="UserInfo-name">{props.user.name}</div>
>    </div>
>  );
>}
>
>function Comment(props) {
>  return (
>    <div className="Comment">
>      <UserInfo user={props.author} />
>      <div className="Comment-text">{props.text}</div>
>      <div className="Comment-date">
>        {formatDate(props.date)}
>      </div>
>    </div>
>  );
>}
>
>const comment = {
>  date: new Date(),
>  text: 'I hope you enjoy learning React!',
>  author: {
>    name: 'Hello Kitty',
>    avatarUrl: 'https://placekitten.com/g/64/64',
>  },
>};
>ReactDOM.render(
>  <Comment
>    date={comment.date}
>    text={comment.text}
>    author={comment.author}
>  />,
>  document.getElementById('root')
>);
> ```
> [참고](https://ko.reactjs.org/redirect-to-codepen/components-and-props/extracting-components-continued)

UI 일부가 여러 번 사용되거나(`Button`, `Panel`, `Avatar`), UI 일부가 자체적으로 복잡한(`App`, `FeedStory`, `Comment`) 경우에는 별도의 컴포넌트로 만드는 것이 좋다.

### Props는 읽기 전용이다
함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안된다. 다음 `sum` 함수를 살펴보자.
```javascript
function sum(a, b) {
  return a + b;
}
```
이런 함수들을 [순수 함수](https://en.wikipedia.org/wiki/Pure_function)라고 칭한다. 입력값을 바꾸려 하지 않고 항상 동일한 입력 값에 대해 동일한 결과를 반환하기 때문이다.

반면에 다음 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아니다.
```javascript
function withdraw(account, amount) {
  account.total -= amount;
}
```
React는 매우 유연하지만 한 가지 엄격한 규칙이 있다.

**모든 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.**

React 컴포넌트는 state를 통해 위 규칙을 위반하지 않고 사용자 액션, 네트워크 응답 및 다른 요소에 대한 응답으로 시간에 따라 자신의 출력값을 변경할 수 있다.


<br/>

## 5. State와 생명주기
이전(3. 엘리먼트 렌더링)에 다뤘던 시계 예시 코드를 다시 살펴보자. 엘리먼트 렌더링에서는 UI를 업데이트하는 한 가지 방법만 다뤘으며, 렌더링 된 출력값을 변경하기 위해 `ReactDOM.render()`를 호출했다. 
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
이번에는 `Clock`컴포넌트를 완전히 재사용하고 캡슐화해보자. 이 컴포넌트는 스스로 타이머를 설정하고 매초 스스로 업데이트 할 것이다.

시계가 생긴 것에 따라 캡슐화하는 것으로 시작할 수 있다.
```javascript
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
그러나 위 코드에는 중요한 요건이 누락되어 있다. `Clock`이 타이머를 설정하고 매초 UI를 업데이트하는 것이 `Clock`의 구현 세부사항이 되어야 한다. 

이상적으로 한 번만 코드를 작성하고 `Clock`이 스스로 업데이트하도록 만들어야 한다.
```javascript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
이것을 구현하기 위해서 `Clock` 컴포넌트에 "state"를 추가해야 한다.

State는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.

### 함수에서 클래스로 변환하기
다섯 단계로 `Clock`과 같은 함수 컴포넌트를 클래스로 변환할 수 있다.

1. `React.Component`를 확장하는 동일한 이름의 `ES6 class`를 생성한다.
2. `render()`라고 불리는 빈 메서드를 추가한다.
3. 함수의 내용을 `render()` 메서드 안으로 옮긴다.
4. `render()` 내용 안에 있는 `props`를 `this.props`로 변경한다.
5. 남아있는 빈 함수 선언을 삭제한다.

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`Clock`은 이제 함수가 아닌 **클래스**로 정의된다.

`render` 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM 노드로 `<Clock/>`을 렌더링하는 경우 `Clock` 클래스의 단일 인스턴스만 사용된다. 이것은 로컬 state와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해준다.

### 클래스에 로컬 State 추가하기
세 단계에 걸쳐서 `date`를 props에서 state로 이동해보자.
1. `render()` 메서드 안에 있는 `this.props.date`를 `this.state.date`로 변경한다.
```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
2. 초기 `this.state`를 지정하는 [class constructor](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#Constructor_(%EC%83%9D%EC%84%B1%EC%9E%90))를 추가한다.
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
여기서 어떻게 `props`를 기본 constructor에 전달하는지 유의하자.
```javascript
constructor(props) {
  super(props);
  this.state = {date: new Date()};
}
```
**클래스 컴포넌트는 항상 `props`로 기본 constructor를 호출해야 한다.**
3. `<Clock />` 요소에서 `date` prop을 삭제한다.
```javascript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

결과는 다음과 같다.
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

다음으로 `Clock`이 스스로 타이머를 설정하고 매초 스스로 업데이트하도록 만들어 보자.

### 생명주기 메서드를 클래스에 추가하기
많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용 중이던 리소스를 확보하는 것이 중요하다.

`Clock`이 처음 DOM에 렌더링 될 때마다 [타이머를 설정](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)하려고 한다. 이것은 React에서 "마운팅"이라고 한다.
또한 `Clock`에 의해 생성된 DOM이 삭제될 때마다 [타이머를 해제](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)하려고 한다.

컴포넌트 클래스에서 특별한 메서드를 선언해 컴포넌트가 마운트되거나 언마운트 될 때 일부 코드를 작동할 수 있다.
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
이러한 메서드들을 "생명주기 메서드"라고 한다.

`componentDidMount()` 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행된다. 이 장소가 타이머를 설정하기에 좋은 장소이다.
```javascript
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```
`this`(`this.timerID`)엣서 어떻게 타이머 ID를 제대로 저장하는지 주의하자.

`this.props`가 React에 의해 스스로 설정되고 `this.state`가 특수한 의미가 있지만, 타이머 ID와 같이 데이터 흐름 안에 포함되지 않는 어떤 항목을 보관할 필요가 있다면 자유롭게 클래스에 수동으로 부가적인 필드를 추가해도 된다.

`componentWillUnmount()` 생명주기 메서드 안에 있는 타이머를 분해해보자.
```javascript
componentWillUnmount() {
  clearInterval(this.timerID);
}
```
마지막으로 `Clock` 컴포넌트가 매초 작동하도록 하는 `tick()`이라는 메서드를 구현해보자.

이것은 컴포넌트 로컬 state를 업데이트하기 위해 `this.setState()`를 사용한다.
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
위 코드의 시계는 매초 째깍거린다.

현재 어떤 상황이고 메서드가 어떻게 호출되는지 순서대로 요약해보자.

1. `<Clock />`가 `ReactDOM.render()`로 전달되었을 때 React는 `Clock` 컴포넌트의 constructor를 호출한다. `Clock`이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 `this.state`를 초기화한다. 나중에 이 state를 업데이트 할 것이다.
2. React는 `Clock` 컴포넌트의 `render()` 메서드를 호출한다. 이를 통해 React는 화면에 표시되어야 할 내용을 알게 된다. 그 다음 React는 `Clock`의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트한다.
3. `Clock` 출력값이 DOM에 삽입되면, React는 `componentDidMount()` 생명주기 메서드를 호출한다. 그 안에서 `Clock` 컴포넌트는 매초 컴포넌트의 `tick()` 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청한다.
4. 매초 브라우저가 `tick()` 메서드를 호출한다. 그 안에서 `Clock` 컴포넌트는 `setState()`에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행한다. `setState()` 호출 덕분에 React는 state가 변경되니 것을 인지하고 화면에 표시될 내용을 알아내기 위해 `render()` 메서드를 다시 호출한다. 이 때 `render()` 메서드 안의 `this.state.date`가 달라지고 렌더링 출력값은 업데이트된 시각을 포함한다. React는 이에 따라 DOM을 업데이트한다.
5. `Clock` 컴포넌트가 DOM으로부터 한 번이라도 삭제된 것이 있다면 React는 타이머를 멈추기 위해 `componentWillUnmount()` 생명주기 메서드를 호출한다.

### State를 올바르게 사용하기
`setState()`에 대해서 알아야 할 세 가지가 있다.

#### 직접 State를 수정하지 마라.
예를 들어, 이 코드는 컴포넌트를 다시 렌더링하지 않는다.
```javascript
// Wrong
this.state.comment = 'Hello';
```
대신에 `setState()`를 사용한다.
```javascript
// Correct
this.setState({comment: 'Hello'});
```
`this.state`를 지정할 수 있는 유일한 공간을 바로 constructor이다.

#### State 업데이트는 비동기적일 수도 있다.
React는 성능을 위해 여러 `setState()` 호출을 단일 업데이트로 한꺼번에 처리할 수 있다.

`this.props`와 `this.state`가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안된다.

예를 들어, 다음 코드는 카운터 업데이트에 실패할 수 있다.
```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
이를 수정하기 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 `setState()`를 사용한다. 그 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들일 것이다.
```javascript
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
위에서 [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)를 사용했지만, 일반적인 함수에서도 정상적으로 작동한다.

#### State 업데이트는 병합된다.
`setState()`를 호출할 때 React는 제공한 객체를 현재 state로 병합한다. 

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있다.
```javascript
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
별도의 `setState()` 호출로 이러한 변수를 독립적으로 업데이트할 수 있다.
```javascript
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
병합은 얕게 이루어지기 때문에 `this.setState({comments})`는 `this.state.posts`에 영향을 주진 않지만 `this.state.comments`는 완전히 대체된다.

### 데이터는 아래로 흐른다
부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없다.

이 때문에 state는 종종 로컬 또는 캡슐화라고 불린다. state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.
```javascript
<FormattedDate date={this.state.date} />
```
`FormattedDate` 컴포넌트는 `date`를 자신의 props로 받을 것이고 이것이 `Clock`의 state로부터 왔는지, `Clock`의 props에서 왔는지, 수동으로 입력한 것인지 알지 못한다.
```javascript
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```
일반적으로 이를 "하향식(top-down)" 또는 "단방향식" 데이터 흐름이라고 한다. 모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로부터 파생된 UI, 데이터는 오직 트리구조에서 자신의 "아래"에 있는 컴포넌트에만 영향을 미친다.

트리구조가 props들의 폭포라고 상상하면 각 컴포넌트의 state는 임의의 점에서 만나지만 동시에 아래로 흐르는 부가적인 수원(water source)라고 할 수 있다.

모든 컴포넌트가 완전히 독립적이라는 것을 보여주기 위해 `App` 렌더링하는 세 개의 `<Clock>`를 만들어보자.
```javascript
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```
각 `Clock`은 자신만의 타이머를 설정하고 독립적으로 업데이트한다.

React 앱에서 컴포넌트가 유상태 또는 무상태에 대한 것은 시간이 지남에 따라 변경될 수 있는 구현 세부 사항으로 간주한다. 유상태 컴포넌트 안에서 무상태 컴포넌트를 사용할 수 있으며, 그 반재 경우도 가능하다.

<br/>

## 6. 이벤트 처리하기
React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 유사하다. 몇 가지 문법 차이는 다음과 같다.
- **React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용**한다.
- JSX를 사용해 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.

예를 들어, HTML은 다음과 같다.
```javascript
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
React에서는 약간 다르다.
```javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
또다른 차이점으로, **React에서는 `false`를 반환해도 기본 동작을 방지할 수 없다.** 반드시 `preventDefault`를 명시적으로 호출해야 한다. 예를 들어, 일반 HTMl에서는 새 페이지를 여는 링크의 기본 동작을 방지하기 위해 다음과 같은 코드를 작성한다.
```javascript
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
React에서는 다음과 같이 작성할 수 있다.
```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
여기서 `e`는 합성 이벤트다. React는 W3C명세에 따라 합성 이벤트를 정의하기 때문에 브라우저 호환성에 대해 걱정할 필요가 없다. React 이벤트는 브라우저 고유 이벤트와 정확히 동일하게 동작하지는 않는다. 자세한 사항은 [합성 이벤트](https://ko.reactjs.org/docs/events.html)를 참고하자.

React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 `addEventListener`를 호출할 필요가 없다. 대신, 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 된다.

ES6 클래스를 사용해 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러 클래스의 메서드로 만드는 것이다. 예를 들어, 다음 `Toggle` 컴포넌트는 사용자가 "ON"과 "OFF" 상태를 토글할 수 있는 버튼을 렌더링한다.
```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해줘야 한다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```
JSX 콜백 안에서 `this`의 의미에 주의해야 한다. JavaScript에서 클래스 메서드는 기본적으로 [바인딩](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)되어 있지 않다. `this.handleClick`을 바인딩하지 않고 `onClick`에 전달했다면, 함수가 실제 호출될 때 `this`는 `undefined`가 된다.

이는 React만의 특수한 동작이 아니며, [JavaScript에서 함수가 작동하는 방식](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)의 일부이다. 일반적으로 `onClick={this.handleClick}`과 같이 뒤에 `()`를 사용하지 않고 메서드를 참조할 경우, 해당 메서드를 바인딩 해야 한다.

만약 `bind`를 호출하는 것이 불편하다면, 이를 해결할 수 있는 두 가지 방법이 있다. 실험적인 [퍼블릭 클래스 필드 문법](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)을 사용하고 있다면, 클래스 필드를 사옹해 콜백을 올바르게 바인딩할 수 있다.
```javascript
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 한다.
  // 주의: 이 문법은 *실험적인* 문법이다.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
[Create React App](https://github.com/facebook/create-react-app)에서는 이 문법이 기본적으로 설정되어 있다.

만약 클래스 필드 문법을 사용하고 있지 않다면, 콜백에 화살표 함수를 사용하는 방법도 있다.~~(이 부분 잘 이해가 안된다. 위와 다른 점이 무엇인가??)~~
```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
이 문법의 문제점은 `LoggingButton`이 렌더링될 때마다 다른 콜백이 생성된다는 것이다. 대부분의 경우 문제가 되지 않으나, 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다. 이러한 종류의 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장한다.

### 이벤트 핸들러에 인자 전달하기
루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적이다. 예를 들어 `id`가 행의 ID일 경우 다음 코드가 모두 작동한다.
```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
위 두 줄은 동등하며 각각 화살표 함수와 [`Fundtion .prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)를 사용한다. 

두 경우 모두 React 이벤트를 나타내는 `e` 인자가 ID 뒤에 두 번째 인자로 전달된다. 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 `bind`를 사용할 경우 추가 인자가 자동으로 전달된다.

<br/>

## 7. 조건부 렌더링
React에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있다. 이렇게 하면 애플리케이션의 상태에 따라서 컴포넌트 중 몇 개만을 렌더링할 수 있다.

React에서 조건부 렌더링은 JavaScript에서의 조건 처리와 같이 동작한다. `if`나 조건부 연산자와 같은 JavaScript 연산자를 현재 상태를 나타내는 엘리먼트를 만드는 데에 사용하자. 그러면 React는 현재 상태에 맞게 UI를 업데이트할 것이다.

아래 두 컴포넌트가 있다고 가정해보자.
```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
이제 사용자의 로그인 상태에 맞게 위 컴포넌트 중 하나를 보여주는 `Greeting` 컴포넌트를 만든다.
```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```
위 예시는 `isLoggedIn` prop에 따라서 다른 인사말을 렌더링한다.

### 엘리먼트 변수
엘리먼트를 저장하기 위해 변수를 사용할 수 있다. 출력의 다른 부분은 변하지 않은 채로 컴포넌트의 일부를 조건부로 렌더링할 수 있다.

로그아웃과 로그인 버튼을 나타내는 두 컴포넌트가 있다고 가정해보자.
```javascript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```
아래의 예시에서는 `LoginControl`이라는 유상태 컴포넌트를 만들 것이다.

이 컴포넌트는 현재 상태에 맞게 `<LoginButton />`이나 `<LogoutButton />`을 렌더링한다. 또한 이전의 예시에서 `<Greeting />`도 함께 렌더링한다.
```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```
변수를 선언하고 `if`를 사용해서 조건부로 렌더링하는 것은 좋은 방법이지만 더 짧은 구문을 사용하고 싶을 때가 있을 수 있다. 여러 조건을 JSX 안에서 inline으로 처리할 방법 몇 가지를 알아보자.

### 논리 && 연산자로 if를 인라인으로 표현하기
JSX 안에는 중괄호를 이용해서 표현식을 포함할 수 있다. 그 안에 JavaScript의 논리 연산자 `&&`를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있다.
```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
JavaScript에서 `true && expression`은 항상 `expression`으로 평가되고 `false && expression`은 항상 `false`로 평가된다.

따라서 `&&` 뒤의 엘리먼트는 조건이 `true`일 때 출력이 된다. 조건이 `false`라면 React는 무시한다.

false로 평가될 수 있는 표현식을 반환하면 `&&` 뒤에 있는 표현식은 건너뛰지만 false로 평가될 수 있는 표현식이 반환된다는 것에 주의하자. 아래 예시에서 `<div>0</div>`이 render 메서드에서 반환된다.
```javascript
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

### 조건 연산자로 if-else구문 인라인으로 표현하기
엘리먼트는 조건부로 렌더링하는 다른 방법은 조건부 연산자인 `condition ? true : false`(삼항 연산자)를 사용하는 것이다.

아래의 예시에서는 짧은 구문을 조건부로 렌더링한다.
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
가독성은 좀 떨어지지만, 더 큰 표현식에도 이 구문을 사용할 수 있다.
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```
JavaScript와 마찬가지로, 가독서이 좋다고 생각하는 방식을 선택하면 된다. 또한 조건이 너무 복잡하다면 컴포넌트를 분리하는 것도 좋다.

### 컴포넌트가 렌더링하는 것을 막기
다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶을 때가 있을 수 있다. 이때는 렌더링 결과를 출력하는 대신 `null`을 반환하면 해결할 수 있다.

아래의 예시에서는 `<WarningBanner />`가 `warn` prop의 값에 의해서 렌더링된다. prop이 `false`라면 컴포넌트는 렌더링하지 않게 된다.
```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
컴포넌트의 `render` 메서드로부터 `null`을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않는다. 그 예로 `componentDidUpdate`는 계속해서 호출되게 된다.

<br/>

## 8. 리스트와 Key
먼저 JavaScript에서 리스트를 어떻게 변환하는지 살펴보자.

아래는 `map()`함수를 이용해 `numbers` 배열의 값을 두배로 만든 후 `map()`에서 반환하는 새 배열을 `doubled` 변수에 할당하고 로그를 확인하는 코드이다.
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```
위 코드는 콘솔에 `[2, 4, 6, 8, 10]`을 출력한다.

React에서 배열을 엘리먼트 리스트로 만드는 방식은 이와 거의 동일하다.

### 여러개의 컴포넌트 렌러딩 하기
엘리먼트 모음을 만들고 중괄호 `{}`를 이용해 JSX에 포함시킬 수 있다.

아래의 JavaScript `map()` 함수를 사용해 `numbers` 배열을 반복 실행해보자. 각 항목에 대해 `<li>` 엘리먼트를 반환하고 엘리먼트 배열의 결과를 `listItems`에 저장한다.
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
`listItems` 배열을 `<ul>` 엘리먼트 안에 포함하고 DOM에 렌더링한다.
```javascript
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
위 코드는 1부터 5까지의 숫자로 이루어진 리스트를 보여준다.

### 기본 리스트 컴포넌트
일반적으로 컴포넌트 안에서 리스트를 렌더링한다.

이전 예제를 `numbers` 배열을 받아서 순서 없는 엘리먼트 리스트를 출력하는 컴포넌트로 리팩토링할 수 있다.
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
위 코드를 실행하면 리스크의 각 항목에 key를 넣어야 한다는 경고가 표시된다. "key"는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트다. 이제 `numbers.map()` 안에서 리스트의 각 항목에 `key`를 할당해 키 누락 문제를 해결해보자.

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### Key
Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다. key는 엘리먼트에 안정적인  고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 한다.
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
Key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것이다. 대부분의 경우 데이터의 ID를 key로 사용한다.
```javascript
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
렌더링 한 항목에 대한 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있다.
```javascript
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
항목의 순서가 바뀔 수 있는 경우 key에 인덱스 사용을 권장하지 않는다. 이로 인해 성능 저하나 컴포넌트의 state와 관련된 문제가 발생할 수 있기 때문이다.
> [인덱스를 key로 사용할 경우 부정적인 영향에 대한 상세 설명 -Robin Pokorny’s-](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)을 참고하자.

만약 리스트 항목에 명시적으로 key를 지정하지않으면 React는 기본적으로 인덱스를 key로 사용한다.

### Key로 컴포넌트 추출하기
키는 주변 배열의 context에서만 의미있다.

예를 들어 `ListItem` 컴포넌트를 [추출](https://ko.reactjs.org/docs/components-and-props.html#extracting-components)한 경우 `ListItem`안에 있는 `<li>` 엘리먼트가 아니라 배열의 `<ListItem />` 엘리먼트가 key를 가져야 한다.

**예시: 잘못된 Key 사용법**
```javascript
function ListItem(props) {
  const value = props.value;
  return (
    // 틀렸습니다! 여기에는 key를 지정할 필요가 없습니다.
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 틀렸습니다! 여기에 key를 지정해야 합니다.
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**예시: 올바른 Key 사용법**
```javascript
function ListItem(props) {
  // 맞습니다! 여기에는 key를 지정할 필요가 없습니다.
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 맞습니다! 배열 안에 key를 지정해야 합니다.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
`map()` 함수 내부에 있는 엘리먼트에 key를 넣어주는 것이 좋다.

### Key는 형제 사이에서만 고유한 값이어야 한다.
Key는 배열 안 형제 사이에서 고유해야 한다. 하지만 전체 범위에서 고유할 필요는 없다. 두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있다.
```javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```
React에서 key는 힌트를 제공하지만 컴포넌트로 전달하지는 않는다. 컴포넌트에서 key와 동일한 값이 필요하면 다른 이름의 prop으로 명시적으로 전달한다.
```javascript
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```
위 예제에서 `Post` 컴포넌트는 `props.id`를 읽을 수 있지만 `props.key`는 읽을 수 없다.

### JSX에 map() 포함시키기
위 예제에서 별도의 `listItems` 변수를 선언하고 이를 JSX에 포함해보자.
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
JSX를 사용하면 중괄호 안에 모든 표현식을 포함시킬 수 있으므로 `map()` 함수의 결과를 인라인으로 처리할 수 있다.
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```
이 방식을 사용하면 코드가 더 깔끔해지지만, 남발하는 것은 좋지 않다.
JavaScript와 마찬가지로 가독성을 위해 변수로 추출해야 할지 아니면 인라인으로 넣을지를 판단해야 한다.
`map()` 함수가 너무 중첩된다면 컴포넌트로 추출하는 것이 좋다.

<br/>

## 9. 폼
HTML 폼 엘리먼트는 폼 엘리먼트 자체가 내부 상태를 가지기 때문데, React의 다른 DOM 엘리먼트와 조금 다르게 동작한다. 예를 들어, 순수한 HTML에서 아래 폼은 name을 입력받는다.
```javascript
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
위 폼은 사용자가 폼을 제출하면 새로운 페이지로 이동하는 기본 HTML 폼 동작을 수행한다. React에서 동일한 동작을 원한다면 그대로 사용하면 된다. 그러나 대부분의 경우, JavaScript 함수로 폼의 제출을 처리하고 사용자가 폼에 입력한 데이터에 접근하도록 하는 것이 편리하다. 
이를 위한 표준 방식은 "제어 컴포넌트(controlled components)"라고 불리는 기술을 이용하는 것이다.

### 제어 컴포넌트 (Controlled Component)
HTML에서 `<input>`, `<textarea>`, `<select>`와 같은 폼 엘리먼트는 일반적으로 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트한다. React에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며 [`setState()`](https://ko.reactjs.org/docs/react-component.html#setstate)에 의해 업데이트 된다.

React state를 "신뢰 가능한 단일 출처(single source of truth)"로 만들어 두 요소를 결합할 수 있다. 그러면 폼을 렌더링하는 React 컴포넌트는 폼에 발생하는 사용자 입력값을 제어한다. 이런 방식으로 React에 의해 값이 제어되는 입력 폼 엘리먼트를 "제어 컴포넌트(controlled component)"라고 한다. 

예를 들어, 이전 예시가 전송될 때 이름을 기록하길 원한다면 폼을 제어 컴포넌트(controlled component)로 작성할 수 있다.
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
```
`value` 어트리뷰트는 폼 엘리먼트에서 설정되므로 표시되는 값은 항상 `this.state.value`가 되고 React state는 신뢰 가능한 단일 출처(single source of truth)가 된다. React state를 업데이트하기 위해 모든 키 입력에서 `handleChange`가 동작하기 때문에 사용자가 입력할 때 보여지는 값이 업데이트된다.

제어 컴포넌트로 사용하면, input 값은 항상 React state에 의해 결정된다. 코드를 조금 더 작성해야 한다는 의미이지만, 다른 UI 엘리먼트에 input의 값을 전달하거나 다른 이벤트 핸들러에서 값을 재설정할 수 있다.

### textarea 태그
HTML에서 `<textarea>` 엘리먼트는 텍스트를 자식으로 정의한다.
```javascript
<textarea>
  Hello there, this is some text in a text area
</textarea>
```
React에서 `<textarea>`는 `value` 어트리뷰트를 대신 사용한다. 이렇게 하면 `<textarea>`를 사용하는 폼은 한 줄 입력을 사용하는 폼과 비슷하게 작성할 수 있다.
```javascript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
`this.state.value`를 생성자에서 초기화하므로 textarea는 일부 텍스트를 가진채 시작되는 점을 주의하자.

### select 태그
HTML에서 `<select>`는 드롭다운 목록을 만든다. 예를 들어, 이 HTML은 과일 드롭다운 목록을 만든다.
```javascript
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```
`selected` 옵션이 있으므로 Coconut 옵션이 초기값이 되는 점을 주의하자.
React에서는 `selected` 어트리뷰트를 사용하는 대신 최상단 `select` 태그에 `value` 어트리뷰트를 사용한다. 한 곳에서 업데이트만 하면되기 때문에 제어 컴포넌트에서 사용하기 더 편하다. 아래 예시를 보자.
```javascript
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
전반적으로 `<input type="text">`, `<textarea>` 및 `<select>` 모두 매우 비슷하게 동작한다. 모두 제어 컴포넌트를 구현하는데 `value` 어트리뷰트를 허용한다.
> 주의: `select` 태그에 multiple 옵션을 허용한다면 `value` 어트리뷰트에 배열을 전달 할 수 있다.
> ```javascript
> <select multiple={true} value={['B', 'C']}>
> ```


### file input 태그
HTML에서 `<input type="file">`는 사용자가 하나 이상의 파일을 자신의 장치 저장소에서 서버로 업로드하거나 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)를 통해 JavaScript로 조작할 수 있다.
```javascript
<input type="file" />
```
같이 읽기 전용이기 때문에 React에서는 [비제어 컴포넌트](https://ko.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)이다. 

### 다중 입력 제어하기
여러 `input` 엘리먼트를 제어해야할 때, 각 엘리먼트에 `name` 어트리뷰트를 추가하고 `event.target.name` 값을 통해 핸들러가 어떤 작업을 할지 선택할 수 있게 해준다.

아래 예시를 살펴보자.
```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```
주어진 input 태그의 name에 일치하는 state를 업데이트하기 위해 ES6의 [comcomputed property name](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer#%EC%86%8D%EC%84%B1_%EA%B3%84%EC%82%B0%EB%AA%85) 구문을 사용하고 있다.
```javascript
this.setState({
  [name]: value
});
```
ES6 코드 아래와 같다.
```javascript
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```
또한, `setState()`는 자동적으로 [현재 state에 일부 state를 병합](https://ko.reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged)하기 때문에 바뀐 부분에 대해서만 호출하면 된다.

### 제어되는 Input Null 값
제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다. `value`를 설정했는데 여전히 수정할 수 있다면 실수로 `value`를 `undefined`나 `null`로 설정했을 수 있다.

아래 코드가 그 예시다.(첫 번째 입력은 잠겨있지만 잠시 후 입력이 가능해진다.)
```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

### 제어 컴포넌트의 대안
데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고 React 컴포넌트를 통해 모든 입력 상태를 연결해야 하기 때문에 때로는 제어 컴포넌트를 사용하는게 지루할 수 있다. 특히 기존의 코드베이스를 React로 변경하고자 할 때나 React가 아닌 라이브러리와 React 애플리케이션을 통합하고자 할 때 짜증날 수 있다. 이러한 경우에 입력 폼을 구현하기 위한 대체 기술인 [비제어 컴포넌트](https://ko.reactjs.org/docs/uncontrolled-components.html)를 확인할 수 있다.

### 완전한 해결책
유효성 검사, 방문한 필드 추적 및 폼 제출 처리와 같은 완벽한 해결을 원한다면 [Formik](https://formik.org/)이 대중적인 선택 중 하나이다. 그러나 Formik은 제어 컴포넌트 및 state 관리에 기초하기 때문에 배우기 쉽지 않다.

<br/>

## 10. Sttate 끌어올리기
동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 생긴다. 이럴 때 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋다. 

이번 섹션에서는 주어진 온도에서 물의 끓는 여부를 추정하는 온도 계산기를 만들어보자.

먼저 `BoilingVerdict`라는 이름의 컴포넌트부터 만들어보자. 이 컴포넌트는 섭씨 온도를 의미하는 `celsius` prop를 받아서 이 온도가 물이 끓기에 충분한지 여부를 출력한다.
```javascript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```
그 다음으로 `Calculator`라는 컴포넌트를 만들자. 이 컴포넌트는 온도를 입력할 수 있는 `<input>`을 렌더링하고 그 값을 `this.state.temperature`에 저장한다.

또한 현재 입력값에 대한 `BoilingVerdict` 컴포넌트를 렌더링한다.
```javascript
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

### 두 번째 Input 추가하기
새 요구사항으로써 섭씨 입력 필드뿐만 아니라 화씨 입력 필드를 추가하고 두 필드 간에 동기화 상태를 유지하도록 해보자.

`Calculator`에서 `TemperatureInput` 컴포넌트를 빼내는 작업부터 시작해보자. 또한 `"c"` 또는 `"f"`의 값을 가질 수 있는 `scale` prop을 추가하자.
```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
이제 `Calculator`가 분리된 두 개의 온도 입력 필드를 렌더링하도록 변경할 수 있다.
```javascript
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```
이제 두 개의 입력 필드를 갖게 되었다. 그러나 둘 중 하나에 온도를 입력하더라도 다른 하나는 갱신되지 않는 문제가 있다. 이것은 두 입력 필드 간에 동기화 상태를 유지하고자 했던 원래의 요구사항과는 맞지 않다.

또한 `Calculator`에서 `BoilingVerdict`도 역시 보여줄 수 없는 상황이다. 현재 입력된 온도 정보가 `TemperatureInput` 안에 숨겨져 있으므로 `Calculator`는 그 값을 알 수 없기 때문이다.

### 변환 함수 작성하기
먼저, 섭씨를 화씨로, 또는 그 반대로 변환해주는 함수를 작성해보자.
```javascript
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```
이 두 함수는 숫자를 변환한다. 이제 `temperature` 문자열과 변환 함수를 인수로 취해서 문자열을 반환하는 또 다른 함수를 작성해보자. 그리고 그것을 한 입력값에 기반해 나머지 입력값을 계산하는 용도로 사용할 것이다.

아래 함수는 올바르지 않은 `temperature` 값에 대해서는 빈 문자열을 반환하고 값을 소수점 세 번째 자리로 반올림해 출력한다.
```javascript
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```
예를 들어 `tryConvert('abc', toCelsius)`는 빈 문자열을 반환하고 `tryConvert('10.22', toFahrenhit)`는 `'50.396'`을 반환한다.

### State 끌어올리기
현재는 두 `TemperatureInput` 컴포넌트가 각각의 입력값을 각자의 state에 독립적으로 저장하고 있다.
```javascript
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```
하지만 두 입력값이 서로 동기화되도록 해야한다. 섭씨온도 입력값을 변경할 경우 화씨온도 입력값 역이 변환된 온도를 반영할 수 있어야 하고, 그 반대의 경우도 마찬가지여야 한다.

React에서 state를 공유하는 일은 그 값을 필요로 하는 컴포넌트 간의 가장 가까운 공통 조상으로 state를 끌어올림으로써 이뤄낼 수 있다. 이 방법을 "state 끌어올리기"라고 한다. 이제 `TemperatureInput`이 개별적으로 가지고 있던 지역 state를 지우는 대신, `Calculator`로 그 값을 옮겨놔보자.

`Calculator`가 공유될 state를 소유하고 있으면 이 컴포넌트는 두 입력 필드의 현재 온도에 대한 "진리의 원천(source of truth)"이 된다. 이를 통해 두 입력 필드가 서로 간에 일관된 값을 유지하도록 만들 수 있다. 두 `TemperatureInput` 컴포넌트의 props가 같은 부모인 `Calculator`로부터 전달되기 때문에, 두 입력 필드는 항상 동기화된 상태를 유지할 수 있게 된다.

동작 순서를 살펴보자.

우선, `TemperatureInput` 컴포넌트에서 `this.state.temperature`를 `this.props.temperature`로 대체할 것이다. 지금은 `this.props.temperature`가 이미 존재한다고 가정해보자. 나중에는 이 값을 `Calculator`로부터 건네야 할 것이다.
```javascript
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```
[props는 읽기 전용](https://ko.reactjs.org/docs/components-and-props.html#props-are-read-only)이다. `temperature`가 지역 state였을 때는 그 값을 변경하기 위해서 그저 `TemperatureInput`의 `this.setState()`를 호출하는 것으로 충분했다. 그러나 이제 `temperature`가 부모로부터 prop으로 전달되기 때문에 `TemperatureInput`은 그 값을 제어할 능력이 없다.

React에서는 보통 이 문제를 컴포넌트를 **제어** 가능하게 만드는 방식으로 해결한다. DOM `<input>`이 `value`와 `onChange` prop을 건네받는 것과 비슷한 방식으로, 사용자 정의된 `TemperatureInput` 역시 `temperature`와 `onTemperatureChange` props를 자신의 부모인 `Calculator`로부터 건네받을 수 있다.

이제 `TemperatureInput`에서 온도를 갱신하고 싶으면 `this.props.onTemperatureChange`를 호출하면 된다.
```javascript
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```
> 사용자 정의 컴포넌트에서 `temperature`와 `onTemperaturechange` prop의 이름이 특별한 의미를 갖진 않는다. 일관된 컨벤션으로 `value`와 `onChange`를 사용할 수도 있으며, 원하는 어떤 이름으로도 사용할 수 있다.

`onTemperatureChange` prop은 부모 컴포넌트인 `Calculator`로부터 `temperature` prop과 함께 제공될 것이다. 이를 이용해 자신의 지역 state를 수정해서 변경사항을 처리하므로, 변경된 새 값을 전달받은 두 입력 필드는 모두 리렌더링 될 것이다. `Calculator`의 새로운 구현체는 조금 뒤에 살펴볼 것이다.

`Calculator`의 변경사항을 들여다보기 전에 `TemperatureInput` 컴포넌트에 대한 변경사항부터 요약해보자. 이 컴포넌트의 지역 state를 제거했으며 `this.state.temperature` 대신에 `this.props.temperature`를 읽어오도록 변경했다. state를 변경하고 싶을 경우 `this.setState()` 대신에 `Calculator`로부터 건네받은 `this.props.onTemperatureChange()`를 호출하도록 만들었다.
```javascript
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
이제 다시 `Calculator` 컴포넌트로 와보자.

`temperature`와 `scale`의 현재 입력값을 이 컴포넌트의 지역 state에 저장한다. 이것은 우리가 입력 필드들로부터 "끌어올린" state이며 그들에 대한 "진리의 원천(source of truth)"으로 작용할 것이다. 또한 두 입력 필드를 렌더링하기 위해서 알아야 하는 모든 데이터를 최소한으로 표현한 것이기도 하다.

예를 들어서 섭씨 입력 필드에 37을 입력하면 `Calculator` 컴포넌트의 state는 다음과 같을 것이다.
```javascript
{
  temperature: '37',
  scale: 'c'
}
```
이후에 화씨 입력 필드의 값을 212로 수정하면 `Calculator`의 state는 다음과 같은 모습일 것이다.
```javascript
{
  temperature: '212',
  scale: 'f'
}
```
두 입력 필드에 모두 값을 저장하는 일도 가능했지만 결국은 불필요한 작업이었던 것이다. 가장 최근에 변경된 입력값과 그 값이 나타내는 단위를 저장하는 것만으로도 충분하다. 그러고 나면 현재의 `temperature`와 `scale`에 기반해 다른 입력 필드의 값을 추론할 수 있다.

두 입력 필드의 값이 동일한 state로부터 계산되기 때문에 이 둘은 항상 동기화된 상태를 유지하게 된다.
```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
```
이제 어떤 입력 필드를 수정하든 간에 `Calculator`의 `this.state.temperature`와 `this.state.scale`이 갱신된다. 입력 필드 중 하나는 있는 그대로의 값을 받으므로 사용자가 입력한 값이 보존되고, 다른 입력 필드의 값은 항상 다른 하나에 기반해 재계산된다.

입력값을 변경할 때 일어나는 일들을 정리해보자.

- React는 DOM `<input>`의 `onChange`에 지정된 함수를 호출한다. 위 예이싀 경우 `TemperatureInput`의 `handleChange` 메서드에 해당한다.
- `TemperatureInput` 컴포넌트의 `handleChange` 메서드는 새로 입력된 값과 함계 `this.props.onTemperatureChange()`를 호출한다. 
  `onTemperatureChange`를 포함한 이 컴포넌트의 props는 부모 컴포넌트인 `Calculator`로부터 제공받은 것이다.
- 이전 렌더링 단계에서 `Calculator`는 섭씨 `TemperatureInput`의 `onTemperatureChange`를 `Calculator`의 `handleCelsiusChange` 메서드로, 화씨 `TemperatureInput`의 `onTemperatureChange`를 `Calculator`의 `handleFahrenheitChange` 메서드로 지정해놨다. 따라서 둘 중에 어떤 입력 필드를 수정하느냐에 따라서 `Calculator`의 두 메서드 중 하나가 호출된다.
- 이들 메서드는 내부적으로 `Calculator` 컴포넌트가 새 입력값, 그리고 현재 수정한 입력 필드의 입력 단위와 함께 `this.setState()`를 호출하게 함으로써 React에게 자신을 다시 렌더링하도록 요청한다.
- React는 UI가 어떻게 보여야 하는지 알아내기 위해 `Calculator` 컴포넌트의 `render` 메서드를 호출한다. 두 입력 필드의 값은 현재 온도와 활성화된 단위를 기반으로 재계산된다. 온도의 변환이 이 단계에서 수행된다.
- React는 `Calculator`가 전달한 새 props와 함께 `TemperatureInput` 컴포넌트의 `render` 메서드를 호출한다. 그러면서 UI가 어떻게 보여야 할지를 파악한다.
- React는 `BoilingVerdict` 컴포넌트에게 섭시온도를 props로 건네면서 그 컴포넌트의 `render` 메서드를 호출한다.
- React DOM은 물의 끓는 여부와 올바른 입력값을 일치시키는 작업과 함께 DOM을 갱신한다. 값을 변경한 입력 필드는 현재 입력값을 그대로 받도, 다른 입력 필드는 변환된 온도 값으로 갱신된다.

입력 필드의 값을 변경할 때마다 동일한 절차를 거치고 두 입력 필드는 동기화된 상태로 유지된다.

### 정리
React 애플리케이션 안에서 변경이 일어나는 데이터에 대해서는 "진리의 원천(source of truth)"을 하나만 두어야 한다. 보통의 경우, state는 렌더링에 그 값을 필요로 하는 컴포넌트에 먼저 추가된다. 그러고 나서 다른 컴포넌트도 역시 그 값이 필요하게 되면 그 값을 그들의 가장 가까운 공통 조상으로 끌어올리면 된다. 다른 컴포넌트 간에 존재하는 state를 동기화시키려고 노력하는 대신 [하향식 데이터 흐름](https://ko.reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down)에 기대는 걸 추천한다.

state를 끌어올리는 작업은 양방향 바인딩 접근 방식보다 더 많은 "보일러 플레이트" 코드를 유발하지만, 버그를 찾고 격리하기 더 쉽게 만든다는 장점이 있다. 어떤 state든 간에 특정 컴포넌트 안에서 존재하기 마련이고 그 컴포넌트가 자신의 state를 스스로 변경할 수 있으므로 버그가 존재할 수 있는 범위가 크게 줄어든다. 또한 사용자의 입력을 거부하거나 변형하는 자체 로직을 구현할 수도 있다.

어떤 값이 props 또는 state로부터 계산될 수 있다면, 아마도 그 값을 state에 두어서는 안 될 것이다. 예를 들어 `celsiusValue`와 `fahrenheitValue`를 둘 다 저장하는 대신, 단지 최근에 변경된 `temperature`와 `scale`만 저장하면 된다. 다른 입력 필드의 값은 항상 그 값들에 기반해서 `render()`메서드 안에서 계산될 수 있다. 이를 통해 사용자 입력값의 정밀도를 유지한 채 다른 필드의 입력값에 반올림을 지우거나 적용할 수 있게 된다.

UI에서 무언가 잘못된 부분이 있을 경우, [React Developer Tools](https://github.com/facebook/react/tree/master/packages/react-devtools)를 이용해 props를 검사하고, state를 갱신할 책임이 있는 컴포넌트를 찾을 때까지 트리를 따라 탐색해보자. 이렇게 함으로써 소스 코드에서 버그를 추적할 수 있다.

<br/>

11. 합성 (Composition) vs 상속 (Inheritance)














