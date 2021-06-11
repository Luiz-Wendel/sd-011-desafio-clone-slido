import React from 'react';
import QuestionsContainer from './components/QuestionsContainer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      filter: 'oldest',
      filteredQuestions: [],
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.addLike = this.addLike.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    this.setState({
      filter,
    }, () => this.filterQuestions());
  }

  filterQuestions() {
    const { questions, filter } = this.state;
    let filteredQuestions = questions.slice();

    if (filter === 'newest') filteredQuestions.reverse();

    if (filter === 'likes') {
      filteredQuestions = filteredQuestions
        .sort(
          (firstQuestion, secondQuestion) => secondQuestion.likes - firstQuestion.likes,
        );
    }

    this.setState({
      filteredQuestions,
    });
  }

  addQuestion(newQuestion) {
    this.setState(({ questions }) => ({
      questions: [...questions, { ...newQuestion, likes: 0 }],
    }), () => this.filterQuestions());
  }

  addLike({ questionText, username }) {
    const { questions } = this.state;

    const updatedQuestions = questions
      .map((question) => {
        if (questionText === question.questionText && username === question.username) {
          question.likes += 1;
        }
        return question;
      });

    this.setState({
      questions: updatedQuestions,
    }, () => this.filterQuestions());
  }

  render() {
    const { filteredQuestions } = this.state;

    return (
      <main className="main">
        <h1>Sli.do Clone Challenge</h1>
        <QuestionsContainer
          questions={ filteredQuestions }
          addQuestion={ this.addQuestion }
          addLike={ this.addLike }
          handleFilter={ this.handleFilter }
        />
      </main>
    );
  }
}

export default App;
