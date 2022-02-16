import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../services/fetch';

const NUMBER = 0.5;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [], // retorno da API
      questionNumber: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { questions } = this.state;
    const token = localStorage.getItem('token');
    const data = await fetchQuestion(token);
    this.setState({
      questions: data.results,
      loading: false,
    });
    console.log(token);
  }

  render() {
    const { questions, questionNumber, loading } = this.state;
    if (loading) return <h1>loading...</h1>;
    const {
      category,
      correct_answer,
      incorrect_answers,
      question,
    } = questions[questionNumber];

    let allAnswer = [...incorrect_answers, correct_answer];
    allAnswer = allAnswer.sort(() => Math.random() - NUMBER);

    return (

      <main>
        {console.log(allAnswer)}
        <section>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{question}</p>
        </section>

        <section data-testid="answer-options">
          {allAnswer.map((answer, index) => {
            if (answer === correct_answer) {
              return (
                <button
                  key={ answer }
                  type="button"
                  data-testid="correct-answer"
                >
                  {answer}
                </button>
              );
            }
            return (
              <button
                key={ answer }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>);
          })}
        </section>
      </main>
    );
  }
}

export default Game;
// if(answer === correct_answer) { = correct_answer} else {xablau === `${wrong-answer} - ${index}`
