import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  // id = 0; // id 값은 렌더링되는 값이 아니기 때문에 state에 넣어주지 않은 것이다.
  // setState를 하는 이유는 어떤 값이 수정되었을 때 리렌더링을 하기 위함이다.

  id = 3;  // state의 information에 0~2까지의 데이터를 넣어뒀기 때문에 다음에 새로 입력할 데이터에 3부터 id를 부여하기 위함.

  // PhoneForm에서 받아온 데이터를 App.js의 상태에 담아줘보자.

  // 1. state를 생성해 information배열을 만들어준다.(이 배열에 받아온 데이터를 넣어줄 것이다.)
  state = {
    // information: [],
    information: [  // 컴포넌트 업데이트 최적화 작업을 위해 information에 기본 정보를 넣어두고 작업해보자.
      {  
        id: 0,
        name: '홍길동',
        phone: '010-0000-0001'
      },
      {  
        id: 1,
        name: '박길동',
        phone: '010-0000-0022'
      },
      { 
        id: 2,
        name: '최길동',
        phone: '010-0000-0333'
      },
    ],
    keyword: '',
  }

  handleChange = (e) => { // keyword를 바꿔줄 함수.
    this.setState({
      keyword: e.target.value,
    })
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

  handleRemove = (id) => {
    const { information } = this.state; // 비구조화 할당을 통해서 information이라는 레퍼런스를 따로 만들어준다.
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => {
          if (info.id === id) {
            return {
              id,
              ...data,
            }
          }
          return info; // else인 경우 그냥 return.
        }
      )
    })
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
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
        {/* {JSON.stringify(this.state.information)} */}
      </div>
    );
  }
}

export default App;
