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
    const { addQuestion } = this.props;

    addQuestion({ ...this.state, timestamp: Date.now() });

    this.setState({ ...initialState });
  }

  render() {
    const { questionText, username } = this.state;

    return (
      <form className={ style.form }>
        <label htmlFor="questionText">
          Question:
          <textarea
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
