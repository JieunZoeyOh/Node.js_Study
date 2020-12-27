const React = require('react');
const TryHooks = require('./TryHooks');
const { useState } = React;

const getNumbers = () => {
  // this 사용하지 않는 함수는 밖으로 빼도 된다.
  // 안 곂치는 숫자 4개 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseballHooks = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setTries((prevTries) => [...prevTries, { try: value, result: '홈런!' }]);
      setResult('홈런');
      alert('게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`);
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => [
          ...prevTries,
          { try: value, result: `${strike} 스트라이크, ${ball} 볼` },
        ]);
        setValue('');
        setResult('');
      }
    }
  };

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((item, index) => (
          <TryHooks
            tryInfo={item}
            index={index}
            key={item.try + item.result + index}
          />
        ))}
      </ul>
      {/* key에 index 사용하지 말기 */}
    </>
  );
};

module.exports = NumberBaseballHooks;
