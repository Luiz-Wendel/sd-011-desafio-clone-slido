import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from '../../components/Question';
import style from './style.module.css';

export default class Answered extends Component {
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

    handleFilter('answeredQuestionsfilter', value);
  }

  render() {
    const { questions, addLike, location } = this.props;
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
      <section className={ style.answeredContainer }>
        <h1>Answered Questions</h1>
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
                    location={ location }
                  />
                ))
          }
        </section>
      </section>
    );
  }
}

Answered.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  addLike: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.string),
  handleFilter: PropTypes.func,
}.isRequired;
