## 8장 Hooks

### 8.1 useState
가장 기본적인 Hook이며, 가변적인 상태를 지닐 수 있게 해 줍니다. useState 함수의 파라미터에는 상태의 기본값을 넣어 주는데 이 함수가 호출되면 배열을 반환합니다. 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수입니다. 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링됩니다.
```javascript
import React from 'react';
import { useState } from 'react';

const Info = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

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
```

### 8.2 useEffect
리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook입니다. 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라집니다.

```javascript
useEffect(()=>{
        console.log('렌더링이 완료되었습니다!');
        console.log({name , nickname});
    })
```

![](https://velog.velcdn.com/images/guddyd6761/post/e1b552b6-209f-40b8-a8e7-80ed0b1f51a5/image.png)

useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됩니다.
```javascript
useEffect(()=>{
        console.log('마운트될 때만 실행됩니다.');
    },[]);
```

특정값이 업데이트될 때만 실행하고 싶을 때는 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어 주면 됩니다.
```javascript
useEffect(()=>{
        console.log(name);
    },[name]);
```
컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리(cleanup)함수를 반환해 주어야 합니다.
```javascript
useEffect(() => {
    console.log(‘effect‘);
    console.log(name);
    return () => {
      console.log(‘cleanup‘);
      console.log(name);
    };
  });
```
**클린업 사용시 작동순서**
> re-render -> 이전 effect clean-up -> effect


### 8.3 useReducer
useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook입니다. 
리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담는 액션 값을 전달받아 새로운 상태를 반환하는 함수로, 반드시 불변성을 지켜주어야 합니다.
```javascript
function reducer(state,action){
	return { ... }; // 불변성을 지키면서 업데이트한 새로운 상태를 반환합니다.
}
```

```javascript
import React, { useReducer } from "react";


function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}



const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });



return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: ‘INCREMENT‘ })}>+1</button>
      <button onClick={() => dispatch({ type: ‘DECREMENT‘ })}>-1</button>
    </div>
  );
};

export default Counter;
```
첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 줍니다. 이 Hook을 사용하면 state값(현재 가리키고 있는 상태)과 dispatch함수(액션을 발생시키는 함수)를 받아 오는데, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조입니다. 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 장점이 있습니다.

### 8.4 useMemo
함수 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있습니다. 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식입니다.
```javascript
import React, { useState, useMemo } from "react";


const getAverage = numbers => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};



const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");



const onChange = e => {
    setNumber(e.target.value);
  };
  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };


// list 배열의 내용이 바뀔 때만 getAverage 함수가 호출
const avg = useMemo(() => getAverage(list), [list]);



return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

### 8.5 useCallback
useMemo와 비슷한 함수로, 주로 렌더링 성능을 최적화해야 하는 상황에서 사용합니다. 

```javascript
import React, { useState, useMemo, useCallback } from "react";


const getAverage = numbers => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};



const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  
  
 // useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 
// 두 번째 파라미터에는 배열을 넣음 -> 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시
  
// 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함
// 예를 들어 onChange의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어 있어도 상관없음
  
// onInsert는 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 넣어야 함
  
  
 // onChange처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한 번만 함수가 생성
const onChange = useCallback(e => {
    setNumber(e.target.value);
}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성
  
  
// onInsert처럼 배열 안에 number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때마다 함수가 생성

const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성



const avg = useMemo(() => getAverage(list), [list]);



return (
    <div>
      <input value={number} onChange={onChange}  />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};



export default Average;
```
> **🔥useMemo와 useCallback의 차이점**
memoization이란 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법을 말한다. useMemo는 메모이제이션된 '값'을 반환하고, useCallback은 메모리제이션된 '함수'를 반환한다.


### 8.6 useRef
useRef를 사용하여 ref를 설정하면 current 값이 실제 엘리먼트를 가리킵니다.
```javascript
import React, { useState, useMemo , useRef} from "react";


const getAverage = numbers => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};



const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);



const onChange = e => {
    setNumber(e.target.value);
  };
  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus();
  };


// list 배열의 내용이 바뀔 때만 getAverage 함수가 호출

const avg = useMemo(() => getAverage(list), [list]);



return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl}/>
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};



export default Average;
```

컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있는데, `로컬변수란 렌더링과 상관없이 바뀔 수 있는 값을 의미`합니다. 이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의하고
렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성합니다.

```javascript
import React, { useRef } from 'react';
 
const RefSample = () => {
  
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  }
  const printId = () => {
    console.log(id.current);
  }
  return (
    <div>
      refsample
    </div>
  );
};
 
export default RefSample;
```

### 8.7 커스텀 Hooks 만들기
여러 컴포넌트에서 비슷한 기능을 공유할 경우, 커스텀 Hook으로 작성하여 재사용 할 수 있습니다.
```javascript
// useInputs.js

import { useReducer } from "react";
 
function reducer(state, action) {
  return {
    …state,
    [action.name]: action.value
  };
}
 
export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```
