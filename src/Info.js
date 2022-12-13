import React, { useEffect } from 'react';
import { useState } from 'react';

const Info = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(()=>{
        console.log('렌더링이 완료되었습니다!');
        console.log({name , nickname});
    })

    const onChangeName = e => {
        setName(e.target.value);
    }
    const onChangeNickname = e => {
        setNickname(e.target.value)
    }
    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName}></input>
                <input value={nickname} onChange={onChangeNickname}></input>
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임:</b>{nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;