# 2. JSX
## JSX 기본 문법 알아보기
JSX는 html와 비슷하지만 자바스크립트로 변환된다. 

### 지켜야할 규칙
1. 태그는 꼭 닫혀이었야 한다.
	```javascript
	<div></div>
	
	<input /> // self closing
	```
2.  두 개 이상의 엘리먼트는 하나의 엘리먼트로 감싸져 있어야 한다.
	```javascript
	<div>
		<div></div>
		<button></button>
	</div>
	```
	- 하지만, 위 코드처럼 단 두개의 태그 렌더링을 위해 불필요한 태그를 하나 더 감싸줘야 한다. 이를 위해 리액트 16.2에서부터 프레그먼트(Fragment)라는 기능이 생겼다.
	```javascript
	import React, { Component, Fragment } from 'react';
	
	class App extends Component {
		render() {
			return (
				<Fragment>
					<div></div>
					<div></div>
				</Fragment>
			);
		}
	}	
	export default App;
	```

### JSX 안에서 자바스크립트 값 사용하기
`{}`안에 자바스크립트 값을 입력해준다.
```javascript
import React, { Component, Fragment } from 'react';
	
class App extends Component {
	render() {
		const name = 'ej!';
		return (
			<div>
			   hello {name}
			</div>
		);
	}
}

export default App;
```
위 코드의 결과로 화면에 `hello ej!`가 출력된다.


### var  / const / let
#### var
 - 선언된 함수 내에서 유효하다.(함수 레벨 스코프)
 - ES6에서는 더이상 사용하지 않는다.

#### let
- 선언된 `{}`블록 내에서 유효하다.(블록 레벨 스코프)
- 한 번 선언 후 유동적으로 값이 변해야 할 경우 사용한다.

#### const
- 선언된 `{}`블록 내에서 유효하다.(블록 레벨 스코프)
- 한번 선언 후 고정적인 값일 경우에 사용한다.

### 조건부 렌더링
JSX 안에서 자바스크립트 값을 사용할 때 **`{}` 안**에 if문 등을 사용할 수는 없다. 그렇기 때문에 여러 방법이 있는데, 가장 많이 이용하는 방법은 **삼항연산자**를 사용하는 것이다.
```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'ej';
    return ( 
      <div>
        {
          name === 'ej' && <div>ej다!!</div>
        }
      </div>;
    );
  }
}

export  default  App;
```
위 코드는 선언된 `name`이 `ej`일 경우에만 `ej다!!`라는 글자를 화면에 출력하게 된다.


조건이 여러개일 경우에는 JSX 바깥에서 작성하는 것이 일반적이다.
하지만, 굳이 JSX 내부에서 여러 개의 조건을 사용하고 싶을 경우에는 IIFE를 이용해서 함수를 선언하고 바로 실행하는 방식으로 구현할 수 있다.
```javascript
c
```


#### `() => {}`
화살표 함수. ES6에서 사용한다.
`this`, `arguments`, `super` 개념이 없는 함수.

<br/>

### JSX에서 CSS style과 class 사용
css style은 객체 형태로 넣어줘야 한다.
css style이름은 카멜케이스로 작성해야 한다.
```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    const style = {
      backgroundColor: 'black',
      padding: '16px',
      color: 'white',
      fontSize: '36px'
      // fontSize:  5  +  10  +  'px'
      // 위처럼 자바스크립트로도 작성할 수 있다.
    };
    return <div style={style}>안녕하세요!</div>;
  }
}

export default App;
```

### className을 이용해 css를 작성할 수도 있다.
App.js
```javascript
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return <div className="App">안녕하세요!</div>;
  }
}

export default App;

```
App.css
```javascript
.App {
  background: black;
  color: aqua;
  font-size: 36px;
  padding: 1rem;
  font-weight: 600;
}

```

`className`이라고 입력해줘야 한다.
`class`라고 입력해도 작동을 하긴 한다. 하지만 `className`이 올바른 컨벤션이니 `className`을 사용하자.

### JSX에서 주석 작성하기
멀티라인(`/**/`)으로 작성하되, 브라켓(`{}`)으로 감싸줘야 한다.
```javascript
{/* 주석처리 */}
```
컴포넌트 생성 후 컴포넌트에 주석을 작성할 경우에는 `//`를 사용해준다.
```javascript
<div
// 컴포넌트에 주석 쓸거야!!!
>
></div>
```



***
- [JSX 참고문서](https://react-anyone.vlpt.us/03.html)  
- [let](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let) 
- [const](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const)  
- [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)





