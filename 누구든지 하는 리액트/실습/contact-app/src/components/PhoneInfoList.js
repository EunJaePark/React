import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
    static defaultProps = {  // data를 props로 받아왔을 경우에만 data를 map으로 돌릴 수 있도록 static props값을 줄 수 있다. (해당 데이터가 있을 때만 작업하는 방법 1)
        data: []
    }
    render() {
        const { data, onRemove, onUpdate } = this.props;

        console.log('rendering list')

        if(!data) return null; // 만약 data가 존재하지 않을 경우 return해주도록 if문으로 조건 줌. (해당 데이터가 있을 때만 작업하는 방법 2)

        const list = data.map(
            info => (<PhoneInfo onRemove={onRemove} onUpdate={onUpdate} info={info} key={info.id} />)
        );
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;