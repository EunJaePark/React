# props 와 state
## props를 사용하는 방법
props는 **부모 컴포넌트가 자식 컴포넌트한테 값을 전달할 때 사용**된다.
- 컴포넌트를 렌더링 할 때 특정 값을 설정해 주는 방식으로 사용하면 된다.
- **자식 컴포넌트** 입장에서 props는 **읽기 전용** 개념이다.
```javascript
// MyName.js
import React, { Component } from "react";

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b>입니다.
      </div>
    );
  }
}

export default MyName;


// App.js
import React from "react";
import MyName from "./MyName";

export default function App() {
  return <MyName name="ej" />;
}
```
> `안녕하세요! 제 이름은 ej입니다`를 화면에 출력한다.

<br/>

props를 작성하지 않았을 경우 **default props** 값을 이용해서 기본 값을 설정해 줄 수 있다.
static값을 클래스 내부에 선언해주면 된다.
- 클래스 내부에서 static값을 이용
	- 이 방법이 최신 문법이다.
```javascript
// MyName.js
import React, { Component } from "react";

class MyName extends Component {
  static defaultProps = {
    name: "기본이름"
  };
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b>입니다.
      </div>
    );
  }
}

export default MyName;

// App.js
import React from "react";
import MyName from "./MyName";

export default function App() {
  return <MyName />;
}
```
> `안녕하세요! 제 이름은 기본이름입니다`를 화면에 출력한다.

<br/>

- 클래스 바깥 뒤에서 defaultProps를 이용
```javascript
// MyName.js
import React, { Component } from "react";

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b>입니다.
      </div>
    );
  }
}

MyName.defaultProps = {
  name: "EJ"
};

export default MyName;

// App.js
import React from "react";
import MyName from "./MyName";

export default function App() {
  return <MyName />;
}
```
> `안녕하세요! 제 이름은 EJ입니다`를 화면에 출력한다.

<br/>

props를 받아와서 **단순히 보여주기만 하는 경우**에는 **함수형 컴포넌트**를 사용한다.
- 함수형 컴포넌트를 사용할 경우 상단에서 `{ Component }`를 import하지 않아도 된다.
```javascript
import React from "react";

const MyName = ({ name }) => {
  return <div>안녕하세요! 제 이름은 {name}입니다~!</div>;
};

MyName.defaultPtops = {
  name: "ej"
};

export default MyName;
```
> `({ name })`부분은 비구조화 할당 문법이다.
> : 개발자 도구를 열어서 확인하면 된다.
> <img src="./imgs/비구조화할당.png" width="500" />
> `sayHello()`에서 전달한 `name`값과 `age`값을 하나하나 추출해서 넣어주게 되는 것이다.
> 
> 즉,  `({ name })`과 같은 하나의 객체 형태의 파라미터를 객체 내부에 있는 `name`값을 props로 받아와서 사용하는 구조이다.
> - [비구조화 할당 문법](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### 함수형 컴포넌트
**함수형 컴포넌트**가 클래스형 컴포넌트와 다른 주요 차이점은 **state 기능이 없고**, **라이프 사이클 기능도 없다**는 것이다.

함수형 컴포넌트는 **초기 마운트 속도가 미세하게 좀 더 빠르다**. 불필요한 기능이 없기 때문에 **메모리 자원을 덜 사용**한다.

즉, 컴포넌트 생성시 단순히 받아온 값을 보여주기만 할 경우 함수형 컴포넌트를 사용하면 된다. 컴포넌트 수가 많아져도 **속도가 최적화** 될 수 있다.

## State를 사용하는 방법
state는 컴포넌트 **자기 자신**이 들고 있다. 
state는 **내부에서 변경**할 수 있다.
 컴포넌트의 내장함수인 **`setState()`를 이용해서 값을 변경**해 준다.

- state는 **객체**로 정의해줘야 한다.
- 정의한 state값에 변화를 주기 위해서는 `커스텀 메서드`를 만들어줘야 한다.
```javascript
// Counter.js
import React, { Component } from "react";

class Counter extends Component {
  state = {
    number: 0
  };
  
  // 커스텀 메서드(handleIncrease, handleDecrease)
  handleIncrease = () => {
    // this.state.number = this.state.number + 1;
    // 위처럼 작성하면 컴포넌트에서 state값이 변했는지 파악할 수 없다!!! 반드시 `setState()`를 사용해줘야 한다!!!

    this.setState({
      number: this.state.number + 1
    });
  };

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  };

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;

// APP.js
import React from "react";
import Counter from "./Counter";

export default function App() {
  return <Counter />;
}
```
> `render`함수는 일반함수인데 `handleIncrease`와 `handleDecrease`함수는 화살표 함수로 작성을 한 것일까?
> : 일반함수로 작성하게 될 경우 함수 속의 `this`가 무엇을 가리키는지 알 수 없게 된다.
> 
> 1. 일반 함수로 작성하고 싶을 경우, 컴포넌트가 만들어질 때마다 호출되는 `constructor()`함수를 이용한다.
>  2. `extends Component`를 해줬기 때문에 컴포넌트가 가지고 있는 생성함수를 먼저 호출해줘야 한다. 따라서  `super(props)`로 작업해준다.
>  3. `this`를 명시해 준다.
>  ```javascript
>     constructor(props) {
>       super(props);
>       this.handleDecrease = this.handleDecrease.bind(this);
>     }
>     
>     handleDecrease() {
>       this.setState({
>         number: this.state.number - 1
>       });
>     }
>  ```
