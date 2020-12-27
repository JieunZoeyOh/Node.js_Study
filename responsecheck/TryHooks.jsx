const React = require('react');
const { memo } = React;

// const TryHooks = (props) => {
//   return (
//     <li>
//       <div>{props.tryInfo.try}</div>
//       <div>{props.tryInfo.result}</div>
//     </li>
//   );
// };

const TryHooks = memo(({ tryInfo }) => {
  console.log('hooks:memo');
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

module.exports = TryHooks;
