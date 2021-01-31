// 각 전화번호 정보를 보여주는 컴포넌트
import React, { Component, Fragment } from 'react';  // editing 스테이트를 위해 Fragment를 불러옴.

class PhoneInfo extends Component {

    state = {
        editing: false,
        name: '',
        phone: '',
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return true; // shouldComponentUpdate를 구현하지 않았을 경우 기본 작동.

        // state가 바뀔 땐 항상 업데이트를 해주자.
        if (this.state !== nextState) {
            return true;
        }
        return this.props.info !== nextProps.info; // props로 받아온 info값이 달라졌을 경우에만 return true 해줌.

        // 즉, state값도 그대로고, info값도 똑같을 경우에는 render함수를 호출하지 않도록 하는 것이다.

        // 콘솔에서 확인해보면 아래 render()에서 console.log(name);를 실행한 부분이 변경된 내용에만 적용되는 것을 확인할 수 있다. (새로 추가할 경우 추가된 name만 콘솔에 찍히도록 변경됨)
    }
    

    handleRemove = () => {
        const { info, onRemove } = this.props;
        console.log(onRemove);
        onRemove(info.id);
    }

    // state의 editing값을 변환해주는 함수 작성.
    handleToggleEdit = () => {
        // true => false로 전환될 떄
            // onUpdate
        // false => true
            // state에 info 값을 넣어주기
        const { info, onUpdate } = this.props;
        if (this.state.editing) {
            onUpdate(info.id, {
                // 위의 state의 값 중 editing은 넘겨줄 필요가 없기 때문에 this.state를 하지 않고 직접 name과 phone을 작성한것.
                name: this.state.name,
                phone: this.state.phone
            });
        } else {
            this.setState({
                name: info.name,
                phone: info.phone,
            });
        }
        this.setState({
            editing: !this.state.editing,
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const { name, phone} = this.props.info;
        const { editing } = this.state;
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }

        console.log(name);

        return (
            <div style={style}>
                {/* <div><b>{name}</b></div>
                <div>{phone}</div> */}
                {
                    editing ? (
                        // Fragment 대신 div 사용해도 전혀 문제없다.
                        <Fragment> 
                            <div>
                                <input 
                                    name="name"
                                    onChange={this.handleChange} 
                                    value={this.state.name}
                                />
                            </div>
                            <div>
                                <input 
                                    name="phone"
                                    onChange={this.handleChange} 
                                    value={this.state.phone}
                                />
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div><b>{name}</b></div>
                            <div>{phone}</div>
                        </Fragment>
                    )
                }
                <button onClick={this.handleRemove}>삭제</button>
                <button onClick={this.handleToggleEdit}>
                    {editing ? '적용' : '수정'}
                </button>
                {/* 수정 버튼을 통해 내용을 변경하려면 state에서 input의 값들을 관리할 수 있도록 해줘야 한다. */}
            </div>
        );
    }
}

export default PhoneInfo;