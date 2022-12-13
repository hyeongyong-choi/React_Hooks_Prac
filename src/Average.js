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