import React from 'react';
import PropTypes from 'prop-types';
import QuestionForm from '../../components/QuestionForm';
import Question from '../../components/Question';
import style from './style.module.css';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      filter: 'oldest',
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter({ target }) {
    const { handleFilter } = this.props;
    const { value } = target;

    this.setState({
      filter: value,
    });

    handleFilter('questionsFilter', value);
  }

  render() {
    const { questions, addQuestion, addLike, checkAsAnswered, location } = this.props;
    const { filter } = this.state;

    const filterElement = (
      <div className={ style.filters }>
        <select value={ filter } onChange={ this.handleFilter }>
          <option value="oldest">
            Oldest
          </option>
          <option value="newest">
            Newest
          </option>
          <option value="likes">
            Most Likes
          </option>
        </select>
      </div>
    );

    return (
      <section className={ style.questionsComponent }>
        <section id="question-form">
          <QuestionForm addQuestion={ addQuestion } />
        </section>
        {
          questions.length > 1
            ? filterElement
            : null
        }
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
                    checkAsAnswered={ checkAsAnswered }
                    location={ location }
                  />
                ))
          }
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  addQuestion: PropTypes.func,
  addLike: PropTypes.func,
  handleFilter: PropTypes.func,
  checkAsAnswered: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.string),
}.isRequired;
