import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput.jsx';
import todoStyle from '../style/todo-style.scss';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    markTodo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const { todo, markTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className={todoStyle.view}>
          <input
            className={todoStyle.toggle}
            type="checkbox"
            checked={todo.marked}
            onChange={() => markTodo(todo.id)}
          />
          <label onDoubleClick={::this.handleDoubleClick}>
            {todo.text}
          </label>
          <button
            className={todoStyle.destroy}
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.marked,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
