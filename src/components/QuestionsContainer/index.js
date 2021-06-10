import React from 'react';
import PropTypes from 'prop-types';
import QuestionForm from '../QuestionForm';
import Question from '../Question';
import style from './style.module.css';

export default class QuestionsContainer extends React.Component {
  render() {
    const { questions, addQuestion, addLike } = this.props;

    return (
      <section className={ style.questionsComponent }>
        <section id="question-form">
          <QuestionForm addQuestion={ addQuestion } />
        </section>
        <section className={ style.questionsContainer }>
          {
            questions.length < 1
              ? <span>No questions yet!</span>
              : questions
                .map((question, index) => (
                  <Question key={ index } question={ question } addLike={ addLike } />
                ))
          }
        </section>
      </section>
    );
  }
}

QuestionsContainer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addQuestion: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
};
