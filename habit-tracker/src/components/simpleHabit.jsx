import React, { useState, useRef, useCallback } from 'react';

const SimpleHabit = props => {
  // 호출 될 때 마다 새롭게 멤버변수 생성된다.
  // useState API 사용하면 리액트가 알아서 값을 기억하고 있음.
  // 따라서 0으로 초기화 되지 않는다.
  const [count, setCount] = useState(0);
  // const spanRef = React.createRef(); 호출할 때 마다 새로운 레퍼런스 만들어짐.
  const spanRef = useRef(); // 메모리에 저장하여 재사용 하는 리액트훅 API

  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  });

  return (
    <ul className="habit">
      <span ref={spanRef} className="habit-name">
        Reading
      </span>
      <span className="habit-count">{count}</span>
      <button className="habit-button habit-increase" onClick={handleIncrement}>
        <i className="fas fa-plus-square"></i>
      </button>
    </ul>
  );
};

export default SimpleHabit;
