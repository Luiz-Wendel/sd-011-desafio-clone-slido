import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from '../../components/Question';
import style from './style.module.css';

export default class Answered extends Component {
  render() {
    const { questions, addLike, location } = this.props;

    return (
      <>
        <h1>Answered Questions</h1>
        <section className={ style.questionsContainer }>
          {
            questions.length < 1
              ? <span>No questions yet!</span>
              : questions
                .map((question, index) => (
                  <Question
                    key={ index }
                    question={ question }
                    addLike={ addLike }
                    location={ location }
                  />
                ))
          }
        </section>
      </>
    );
  }
}

Answered.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addLike: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
