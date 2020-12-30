import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  id = 0; // id 값은 렌더링되는 값이 아니기 때문에 state에 넣어주지 않은 것이다.
  // setState를 하는 이유는 어떤 값이 수정되었을 때 리렌더링을 하기 위함이다.

  // PhoneForm에서 받아온 데이터를 App.js의 상태에 담아줘보자.

  // 1. state를 생성해 information배열을 만들어준다.(이 배열에 받아온 데이터를 넣어줄 것이다.)
  state = {
    information: [],
  }

  handleCreate = (data) => {
    // PhoneForm에서 받아온 데이터를 App.js의 상태에 담아줘보자.
    console.log(data);

    // *** 아래 두 가지 방법처럼 작성하면 안된다!!!
    // this.state.information.push(data)
    // this.setState({
    //   information: this.state.information.push(data)
    // })
    // *** 그 이유: 리액트는 불변성을 유지시켜줘야 한다. 
    // 어떤 값을 수정하게 될 때 꼭 setState를 사용해야 하고, 그 내부에 있는 배열이나 객체를 바꾸게 될 경우 기존의 배열/객체를 바꾸는 것이 아니라 기존의 배열/객체를 기반으로 새로운 배열/객체를 만들어서 값을 주입해줘야한다.
    // 따라서 concat이라는 내장함수를 사용해줘야한다.

    const { information } = this.state; // 비구조화 할당 문법을 이용해 handleCreate메서드를 좀 더 간편하게 수정할 수 있다.(코드가 길어지는 것을 방지 + 가독성 높여줌)
    this.setState({
      // information: this.state.information.concat(data)
      information: information.concat(Object.assign({}, data, { // 빈 객체에 data를 넣어주고, 마지막에 적은 {id}도 빈 객체에 넣어주겠다는 의미이다.
        id: this.id++
      }))
     
      // information: information.concat({
      //   name: data.name,
      //   phone: data.phone,
      //   id: this.id++
      // })
      // information: information.concat({
      //   ...data, 
      //   id: this.id++
      // })
    })
  }
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        {JSON.stringify(this.state.information)}
      </div>
    );
  }
}

export default App;
