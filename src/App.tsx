import React, { useCallback, useMemo, useState } from 'react';

const Child: React.FC<{ title: any; onChange: any }> = ({ title, onChange }) => {
  console.log('Child render....');
  return (
    <div style={{ background: 'gray' }} onClick={() => onChange(100)}>
      I am child: {title.subData}
    </div>
  );
};

const ChildMemo = React.memo(Child);

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [subData, setSubData] = useState('haha');
  console.log('Father render....');
  const onChangeCount = useCallback(newCount => setCount(newCount), []);
  return (
    <div>
      <h1>I am Parent: 被点了{count}次</h1>
      {/* <ChildMemo title={subData} onChange={newCount => setCount(newCount)} /> */}
      {/* <ChildMemo title={subData} onChange={onChangeCount} /> */}
      <ChildMemo
        title={useMemo(() => ({ name: subData, age: 1 }), [subData])}
        onChange={onChangeCount}
      />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click
      </button>
    </div>
  );
};
export default App;
