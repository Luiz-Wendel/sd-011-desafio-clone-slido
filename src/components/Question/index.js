import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import style from './style.module.css';

export default class Question extends React.Component {
  render() {
    const { question, addLike, checkAsAnswered, location: { pathname } } = this.props;

    const checkAnsweredButton = (
      <button type="button" onClick={ () => checkAsAnswered(question) }>
        Answered
      </button>
    );

    return (
      <section className={ style.question }>
        <p>{ question.username }</p>
        <p>{ question.questionText }</p>
        <button type="button" onClick={ () => addLike(question) }>
          <span>
            { question.likes }
            <FontAwesomeIcon icon={ faThumbsUp } size="lg" />
          </span>
        </button>
        {
          pathname !== '/answered'
            ? checkAnsweredButton
            : null
        }
      </section>
    );
  }
}

Question.defaultProps = {
  checkAsAnswered: () => {},
};

Question.propTypes = {
  question: PropTypes.shape({
    questionText: PropTypes.string,
    username: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  addLike: PropTypes.func.isRequired,
  checkAsAnswered: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
