import React, { useState, useCallback, useMemo } from "react";

export default function App() {
  const [ex, setEx] = useState(0);
  const [why, setWhy] = useState(0);

  // useMemo 사용하기
  useMemo(() => {console.log(why)}, [ex]);

  // 두 개의 버튼을 설정했다. X버튼만이 ex를 변화시킨다.
  return (
    <>
      <button onClick={() => setEx((curr) => (curr + 1))}>X</button>
      <button onClick={() => setWhy((curr2) => (curr2 + 1))}>Y</button>
    </>
  );
}