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







