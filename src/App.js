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
    this.addLike = this.addLike.bind(this);
  }

  addQuestion(newQuestion) {
    this.setState(({ questions }) => ({
      questions: [...questions, { ...newQuestion, likes: 0 }],
    }));
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
    });
  }

  render() {
    const { questions } = this.state;

    return (
      <main className="main">
        <h1>Sli.do Clone Challenge</h1>
        <QuestionsContainer
          questions={ questions }
          addQuestion={ this.addQuestion }
          addLike={ this.addLike }
        />
      </main>
    );
  }
}

export default App;
