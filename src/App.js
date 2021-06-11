import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import QuestionsContainer from './pages/QuestionsContainer';
import Answered from './pages/Answered';
import PageNotFound from './pages/PageNotFound';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      filter: 'oldest',
      filteredQuestions: [],
      answeredQuestions: [],
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.addLike = this.addLike.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.checkAsAnswered = this.checkAsAnswered.bind(this);
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
    const { questions, answeredQuestions } = this.state;

    const updatedQuestions = questions
      .map((question) => {
        if (questionText === question.questionText && username === question.username) {
          question.likes += 1;
        }
        return question;
      });

    const updatedAnsweredQuestions = answeredQuestions
      .map((answeredQuestion) => {
        if (
          questionText === answeredQuestion.questionText
          && username === answeredQuestion.username
        ) {
          answeredQuestion.likes += 1;
        }
        return answeredQuestion;
      });

    this.setState({
      questions: updatedQuestions,
      answeredQuestions: updatedAnsweredQuestions,
    }, () => this.filterQuestions());
  }

  checkAsAnswered({ questionText, timestamp }) {
    const { questions } = this.state;
    let answeredQuestion = {};

    let notAnsweredQuestions = questions.slice();
    notAnsweredQuestions = questions
      .filter((question) => {
        if (question.timestamp === timestamp && question.questionText === questionText) {
          answeredQuestion = question;
          return false;
        }

        return true;
      });

    this.setState((previousState) => ({
      questions: notAnsweredQuestions,
      answeredQuestions: [...previousState.answeredQuestions, answeredQuestion],
    }), () => this.filterQuestions());
  }

  render() {
    const { filteredQuestions, answeredQuestions } = this.state;

    return (
      <main className="main">
        <h1>Sli.do Clone Challenge</h1>
        <BrowserRouter>
          <nav>
            <Link to="/">Ask a Question</Link>
            <Link to="/answered">Answered Questions</Link>
          </nav>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (
                <QuestionsContainer
                  { ...props }
                  questions={ filteredQuestions }
                  addQuestion={ this.addQuestion }
                  addLike={ this.addLike }
                  handleFilter={ this.handleFilter }
                  checkAsAnswered={ this.checkAsAnswered }
                />) }
            />
            <Route
              path="/answered"
              render={ (props) => (
                <Answered
                  questions={ answeredQuestions }
                  addLike={ this.addLike }
                  { ...props }
                />
              ) }
            />
            <Route component={ PageNotFound } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
