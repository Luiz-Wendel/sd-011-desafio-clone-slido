import React from 'react';
import QuestionsContainer from './components/QuestionsContainer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };

    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion(newQuestion) {
    this.setState(({ questions }) => ({
      questions: [...questions, newQuestion],
    }));
  }

  render() {
    const { questions } = this.state;

    return (
      <main className="main">
        <h1>Sli.do Clone Challenge</h1>
        <QuestionsContainer questions={ questions } addQuestion={ this.addQuestion } />
      </main>
    );
  }
}

export default App;
