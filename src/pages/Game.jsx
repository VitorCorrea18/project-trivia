import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveToken } from '../redux/actions/index';
import { fetchQuestion, fetchToken } from '../services/fetch';
import Header from '../components/Header';
import '../styles/game.css';

const SORT_NUMBER = 0.5;
const EXPIRED_TOKEN_CODE = 3;
const ONE_SECOND = 1000;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [], // retorno da API
      questionNumber: 0,
      sortedAnswers: [],
      loading: true,
      wrongAnswerClassName: '',
      correctAnswerClassName: '',
      counter: 30,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.setTimer();
  }

  setTimer = () => {
    let { counter } = this.state;
    this.intervalId = setInterval(() => {
      if (counter === 0) {
        clearInterval(this.intervalId);
      } else {
        this.setState({
          counter: counter -= 1,
        });
      }
    }, ONE_SECOND);
  }

  sortAnswers = (questions) => {
    // monta um array de arrays, cada array corresponde a uma pergunta e contém suas respectivas respostas embaralhadas
    // e joga o resultado no estado sortedAnswers

    const sortedAnswers = questions.map((quest) => {
      const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswer } = quest;
      return [correctAnswer, ...incorrectAnswer].sort(() => Math.random() - SORT_NUMBER); // https://flaviocopes.com/how-to-shuffle-array-javascript/
    });
    this.setState({ sortedAnswers });
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
      }, this.sortAnswers(data.results));
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
      questions,
      questionNumber,
      loading,
      correctAnswerClassName,
      wrongAnswerClassName,
      sortedAnswers,
      counter,
    } = this.state;

    if (loading) return <h1>loading...</h1>;

    const {
      category,
      correct_answer: correctAnswer,
      question,
    } = questions[questionNumber];

    return (
      <>
        <Header />
        <span>{ counter }</span>
        <main>
          <section>
            <h3 data-testid="question-category">{category}</h3>
            <p data-testid="question-text">{question}</p>
          </section>

          <section data-testid="answer-options">
            {sortedAnswers[questionNumber].map((answer, index) => {
              // usa o mesmo index questionNumber da pergunta sendo exibida na tela "questions[questionNumber]"
              // passa pelo array de respostas da pergunta da vez, e monta os botões com as repostas
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    type="button"
                    className={ correctAnswerClassName }
                    data-testid="correct-answer"
                    onClick={ this.colorAnswer }
                    disabled={ (counter === 0) } // se o estado counter for igual a 0 o disable passa a ser true
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
                  disabled={ (counter === 0) } // se o estado counter for igual a 0 o disable passa a ser true
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
