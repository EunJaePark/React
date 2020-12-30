import React, { Component } from 'react';

class PhoneForm extends Component {
   // <input />의 상태를 어떻게 관리하는지 알아보자.
   // 1. 우선 state를 만들어서 name이라는 값을 넣어서 상태를 정의해준다.
    state = {
        name: '',
        phone: '',
    }
    // 2. input에서 변경 이벤트가 발생할 때 처리할 함수를 만들어 준다.
    handleChange = (e) => { // e를 파라미터로 받아온다. 이것은 이벤트 객체이기 때문에 앞으로 어떻게 수정할 것인지를 알 수가 있다.
        this.setState({
            // name: e.target.value // 앞으로 name값이 어떻게 바뀔 것인지가 e.target.value에 들어있는 것이다.  // e.target는 <input />이다.
            [e.target.name]: e.target.value // name키워드 대신 <input />의 name값이 [e.target.name]으로 들어가지게 되는 것이다. (input태그가 여러개이기 때문에 이렇게 작성한 것.)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(); // 이벤트 발생 시 새로고침을 방지해준다.

        // App.js에서 props로 받았던 onCreate를 호출해준다.
        this.props.onCreate({
            name: this.state.name,
            phone: this.state.phone
        })
        // this.props.onCreate(this.state)로 작성해도 상관없다.

        // input값을 submit할 경우 기존 입력 값들을 초기화 시켜주자.
        this.setState({
            name: '',
            phone: '',
        })
    }
    render() {
        return (
            // <input />태그이기 때문에 value값을 설정해줘야한다. 그리고 값이 변화할 경우 발생할 이벤트를 onChange로 연결시켜줬다.
            // input이 여러개일 경우 관리하기 위해서 <input />태그에 name값을 설정해줘야 한다.
            <form onSubmit={this.handleSubmit}> 
                <input 
                    name="name"
                    placeholder="이름" 
                    onChange={this.handleChange} 
                    value={this.state.name} 
                /> 
                <input 
                    name="phone"
                    placeholder="전화번호" 
                    onChange={this.handleChange}
                    value={this.state.phone} 
                />
                <button type="submit">등록</button>

                {/* input태그에 입력한 내용을 화면에 바로 찍어서 확인해보자. */}
                <div>
                    {this.state.name}  {this.state.phone}
                </div>
            </form> 
        );
    }
}

export default PhoneForm;