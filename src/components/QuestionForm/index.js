import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

export default class QuestionForm extends Component {
  constructor() {
    super();

    this.state = {
      questionText: '',
      username: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { addQuestion } = this.props;
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
        <button type="button" onClick={ () => addQuestion(this.state) }>Submit</button>
      </form>
    );
  }
}

QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};
