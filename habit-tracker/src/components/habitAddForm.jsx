import React, { memo } from 'react';

const HabitAddForm = memo(props => {
  // 함수이므로 지역변수 선언 const inputRef & this 필요 없음 / class에서는 그냥 inputRef
  const inputRef = React.createRef();
  const formRef = React.createRef();

  const onSubmit = event => {
    // refresh 막기
    event.preventDefault();
    const name = inputRef.current.value;
    name && props.onAdd(name);

    // input 입력값 초기화
    // this.inputRef.current.value = '';
    formRef.current.reset();
  };

  return (
    <form ref={formRef} className="add-form" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="add-input"
        placeholder="Enter your Habit"
      />
      <button className="add-button">Add</button>
    </form>
  );
});

export default HabitAddForm;
