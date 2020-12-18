import React, { PureComponent } from 'react';

class Habit extends PureComponent {
  // UI 요소 생길 때
  componentDidMount() {
    console.log(`habit: ${this.props.habit.name} mounted`);
  }

  // UI 요소 사라질 때
  componentWillUnmount() {
    console.log(`habit: ${this.props.habit.name} will unmount`);
  }

  handleIncrement = () => this.props.onIncrement(this.props.habit);

  handleDecrement = () => this.props.onDecrement(this.props.habit);

  handleDelete = () => this.props.onDelete(this.props.habit);

  render() {
    const { name, count } = this.props.habit;
    return (
      <li className="habit">
        <span className="habit-name">{name}</span>
        <span className="habit-count">{count}</span>
        <button
          className="habit-button habit-increase"
          onClick={this.handleIncrement}
        >
          <i className="fas fa-plus-square"></i>
        </button>
        <button
          className="habit-button habit-decrease"
          onClick={this.handleDecrement}
        >
          <i className="fas fa-minus-square"></i>
        </button>
        <button
          className="habit-button habit-delete"
          onClick={this.handleDelete}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </li>
    );
  }
}

export default Habit;
