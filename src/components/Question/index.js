import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

export default class Question extends React.Component {
  render() {
    const { question } = this.props;

    return (
      <section className={ style.question }>
        <p>{ question.username }</p>
        <p>{ question.questionText }</p>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    questionText: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};
