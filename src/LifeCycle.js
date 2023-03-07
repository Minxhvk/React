import { useEffect, useState } from 'react';

const UnmountTest = () => {
  useEffect(() => {
    console.log('Mount!');

    return () => {
      // Unmount 시점에 실행되게 됨
      console.log('Unmount!');
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const LifeCycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  // Create
  useEffect(() => {
    console.log('Mount !');
  }, []);

  // ReRendering
  useEffect(() => {
    console.log('Update !');
  });

  useEffect(() => {
    console.log('Count is Update !');
  }, [count]);

  useEffect(() => {
    console.log('Text is Update !');
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default LifeCycle;
