## shouldComponentUpdate 를 통한 최적화. 불변성을 왜 유지하는가?
불변성을 왜 유지해야 하는지, 컴포넌트 업데이트를 하게 될 때 성능 최적화는 어떻게 하는지 알아보자.

App.js 컴포넌트에서 렌더링을 하게 되면 내부에 있는 자식 컴포넌트들에서도 전부 한 번씩 렌더링이 된다. 
따라서 shouldComponentUpdate를 이용해 업데이트가 불필요할 때는 업데이트가 되지 않도록 성능 최적화를 해줘야한다.

실습 코드에서는 PhoneInfo.js에서 입력된 name을 콘솔에 찍도록 해준 부분을 
shouldComponentUpdate를 이용해 작업해주면 된다.
> `scu`를 입력하면  shouldComponentUpdate가 자동완성 된다.
> (확장 프로그램인 Vue VSCode Snippets를 설치했을 경우에만 가능)


불변성을 유지하지 않게되면 굉장히 복잡해진다. 따라서  리액트에서 배열/객체 등의 데이터를 수정할 때는 불변성 유지가 필수다!

***

```javascript
const nestedObject = {
  a: {
    b: []
  }
}
```
위 코드처럼 복잡한 객체를 다룰 경우 보다 편리하게 작업할 수 있도록 해주는 라이브러리들이 있다.
- [Immutable.js](https://facebook.github.io/immutable-js/)  
- [Immer.js](https://github.com/mweststrate/immer) 

***
- 코드: [https://codesandbox.io/s/1xpzj13yl](https://codesandbox.io/s/1xpzj13yl)

<br/>

## 이름으로 전화번호 찾기
- App.js
```javascript
state = {
    // information: [],
    information: [  // 컴포넌트 업데이트 최적화 작업을 위해 information에 기본 정보를 넣어두고 작업해보자.
      {  
        id: 0,
        name: '홍길동',
        phone: '010-0000-0001'
      },
      ..........
    ],
    keyword: '',
  }

  handleChange = (e) => { // keyword를 바꿔줄 함수.
    this.setState({
      keyword: e.target.value,
    })
  }
  
  ........
  
  render() {
    return {
	  .......
	  <input 
        value={this.state.keyword}
        onChange={this.handleChange}
        placeholder="검색..."
      />
      <PhoneInfoList 
        data={this.state.information.filter(
          info => info.name.indexOf(this.state.keyword) > -1
        )} 
        onRemove={this.handleRemove} 
        onUpdate={this.handleUpdate} 
      />
    }
  }
```
state에 `keyword`를 추가하고, render( )에서 `<input/>`을 이용해 검색하고자 하는 이름을 입력하면 해당 이름의 데이터가 나오도록 `<PhoneInfoList />`에서 `filter`로 필터링해줬다.

***
- 코드: [https://codesandbox.io/s/1xpzj13yl](https://codesandbox.io/s/1xpzj13yl)

<br/>

## Ref 를 통하여 DOM 에 직접 접근하기
### Ref
react에서 DOM에 직접적으로 접근할 수 있는 기능이다.

Ref는 두 가지 방식으로 사용할 수 있다.
1. 함수 사용
    : 함수는 ref를 파라미터로 받아서 해당 컴포넌트의 변수로 ref값을 넣어준다.
2. React.createRef()
   : `current`라는 값을 통해 해당 DOM에 접근이 가능해진다.
   (react 16.3 버전 이상에서만 사용 가능하다.)

### 🚀 실습해보자
실습 파일(전화번호부)에서 이름과 전화번호를 입력 후 등록하기 위해 enter키를 누를 경우, focus가 전화번호가 아닌 이름에 남도록 해보자.

입력하기 위해 생성한 `<input />`태그에 직접 접근해야 가능한 작업이다. 
Ref를 이용해 직접 접근해보자.

- PhoneForm.js
```javascript
// 1. 함수 사용
class PhoneForm extends Component {
  input = null;  // Ref 작업을 위한 것.
  
  handleSubmit = (e) => {
      ..........
      this.input.focus();  
      // handleSubmit이 발생했을 때, <input/>의 DOM에 직접적으로 접근해서 focus를 해준다.
  }

  render() {
    ........
    <input
      .........
      ref={ref=> this.input = ref}
    />
    ..........
  }
}


// 2. React.createRef() 사용
class PhoneForm extends Component {
  input = React.createRef();
  
  handleSubmit = (e) => {
      ........
      this.input.current.focus();
      // React.createRef()를 사용하면 current라는 값을 통해 DOM에 접근할 수 있게 된다.
  }

  render() {
    ........
    <input
      .........
      ref={this.input}
    />
    ..........
  }
}
```

> 이처럼 Ref는 focus를 준다던지, 특정 DOM의 크기를 가져오거나 스크롤 위치를 설정 또는 스크롤 크기를 가져오는 등의 DOM에 직접적인 접근이 필요할 경우 사용하게 된다.
>
> 외부 라이브러리와 연동할 경우에도 Ref를 사용하게 된다.
> Chartist.js 등의 차트 관련 라이브러리를 사용하게 될 때 특정 DOM에 그리도록 해야한다. 이 외에도 canvas를 사용하거나 HTML5 비디오 관련 라이브러리를 사용할 경우에도 Ref를 사용하게 된다.
