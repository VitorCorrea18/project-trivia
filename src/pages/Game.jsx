import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveToken } from '../redux/actions/index';
import { fetchQuestion, fetchToken } from '../services/fetch';
import Header from '../components/Header';
import '../styles/game.css';

const NUMBER = 0.5;
const EXPIRED_TOKEN_CODE = 3;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [], // retorno da API
      questionNumber: 0,
      loading: true,
      wrongAnswerClassName: '',
      correctAnswerClassName: '',
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getNewToken = async () => {
    const { saveTokenProp } = this.props;
    const newToken = await fetchToken(); // Faz requisição de um novo token
    localStorage.setItem('token', newToken.token); // salva o novo token no local Storage
    saveTokenProp(newToken.token); // Salva o novo token no estado global
    this.getQuestions(); // chama novamente a getQuestion para requerir as perguntas
  }

  getQuestions = async () => {
    const token = localStorage.getItem('token'); // recupera o token do localStorage
    const data = await fetchQuestion(token); // requisição das perguntas

    if (data.response_code === EXPIRED_TOKEN_CODE) {
      this.getNewToken(); // se o token estiver expirado chama a getNewQuestion
    } else {
      this.setState({
        questions: data.results,
        loading: false,
      });
    }
  }

  colorAnswer = () => {
    this.setState({
      correctAnswerClassName: 'correct-answer',
      wrongAnswerClassName: 'wrong-answers',
    });
  }

  render() {
    const {
      questions, questionNumber, loading, correctAnswerClassName, wrongAnswerClassName,
    } = this.state;
    if (loading) return <h1>loading...</h1>;
    const {
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
      question,
    } = questions[questionNumber];

    let allAnswer = [correctAnswer, ...incorrectAnswer];
    allAnswer = allAnswer.sort(() => Math.random() - NUMBER); // https://flaviocopes.com/how-to-shuffle-array-javascript/

    return (
      <>
        <Header />
        <main>
          <section>
            <h3 data-testid="question-category">{category}</h3>
            <p data-testid="question-text">{question}</p>
          </section>

          <section data-testid="answer-options">
            {allAnswer.map((answer, index) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    type="button"
                    className={ correctAnswerClassName }
                    data-testid="correct-answer"
                    onClick={ this.colorAnswer }
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
                  className={ wrongAnswerClassName }
                  onClick={ this.colorAnswer }
                >
                  {answer}
                </button>);
            })}
          </section>
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveTokenProp: (token) => dispatch(saveToken(token)),
});

const mapStateToProps = ({ token }) => ({
  token,
});

Game.propTypes = {
  saveTokenProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
