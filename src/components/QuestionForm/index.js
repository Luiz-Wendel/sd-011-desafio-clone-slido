import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const initialState = {
  questionText: '',
  username: '',
};

export default class QuestionForm extends Component {
  constructor() {
    super();

    this.state = { ...initialState };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const hasEmptyField = this.hasEmptyField();

    if (!hasEmptyField) {
      const { addQuestion } = this.props;

      addQuestion({ ...this.state, timestamp: Date.now() });

      this.setState({ ...initialState });
    }

    this.handleEmptyField();
  }

  handleEmptyField() {
    const entries = Object.entries(this.state);

    entries.map(([key, value]) => {
      const emptyElement = document.getElementById(key);
      if (value === '') {
        emptyElement.classList.add(style.empty);
        emptyElement.placeholder = '*This field is required';
      } else {
        emptyElement.classList.remove(style.empty);
        emptyElement.placeholder = '';
      }

      return undefined;
    });
  }

  hasEmptyField() {
    const values = Object.values(this.state);

    return values.some((value) => value === '');
  }

  render() {
    const { questionText, username } = this.state;

    return (
      <form className={ style.form }>
        <label htmlFor="questionText">
          Question:
          <textarea
            className={ style.inputField }
            id="questionText"
            name="questionText"
            value={ questionText }
            onChange={ this.handleInputChange }
            maxLength={ 200 }
          />
        </label>
        <label htmlFor="username">
          Your name:
          <input
            className={ style.inputField }
            id="username"
            name="username"
            value={ username }
            onChange={ this.handleInputChange }
            maxLength={ 50 }
          />
        </label>
        <button type="button" onClick={ this.handleSubmit }>Submit</button>
      </form>
    );
  }
}

QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};
