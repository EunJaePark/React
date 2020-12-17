import React from 'react';

function Title({title}) { // props는 부모 컴포넌트가 전달해주는 속성값.
    console.log('titie render');
    return <p>{title}</p>;
}

export  default React.memo(Title);
// 속성값이 변경될 때만 컴포넌트가 렌더링되게 하려면 `React.memo`를  사용하면 된다.