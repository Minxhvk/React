import React, { useEffect, useState } from 'react';

// React.memo : 컴포넌트를 해당 값이 변하는 것이 아니면 다시 랜더링 하지 않는다.
// 객체의 경우 Equal 함수를 정의해서 값을 판단한 뒤 React.memo의 두 번째 파라미터로 전달
const Textview = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`Update :: Text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Update :: Count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>React.memo Test</button>
      </div>

      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
