import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveToken, saveUserScore, saveUserAssertions } from '../redux/actions/index';
import { fetchQuestion, fetchToken } from '../services/fetch';
import formatQuotes from '../utils/formatString';
import Header from '../components/Header';
import {
  SORT_NUMBER, EXPIRED_TOKEN_CODE, ONE_SECOND, CORRECT_ANSWER_POINTS, EASY,
  EASY_POINTS, MEDIUM, MEDIUM_POINTS, HARD, HARD_POINTS,
  LAST_QUESTION_INDEX } from '../helpers/consts';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      sortedAnswers: [],
      loading: true,
      wrongAnswerClassName: '',
      correctAnswerClassName: '',
      counter: 30,
      nextQuestion: false,
      feedback: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.setTimer();
  }

  setTimer = () => {
    this.intervalId = setInterval(() => {
      const { counter } = this.state;
      if (counter <= 0) {
        clearInterval(this.intervalId);
        this.setState({ counter: 0 });
      } else {
        this.setState((prevState) => ({
          counter: prevState.counter - 1,
        }));
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
      const questions = formatQuotes(data.results);
      this.setState({
        questions,
        loading: false,
      }, this.sortAnswers(questions));
    }
  }

  saveRanking = (newPoints) => {
    const { name, score, email, saveUserScoreProp } = this.props;
    const newScore = score + newPoints;
    const ranking = { name, score: newScore, picture: `https://www.gravatar.com/avatar/${email}` };
    saveUserScoreProp(newScore);
    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.saveAssertions();
  }

  saveAssertions = () => {
    const { saveUserAssertionsProp, assertions } = this.props;
    const newNumberAssertions = assertions + 1;
    saveUserAssertionsProp(newNumberAssertions);
  }

  calculateTotal = (difficulty) => {
    const { counter } = this.state;
    let difficultyPoints = 0;

    switch (difficulty) {
    case EASY:
      difficultyPoints = EASY_POINTS;
      break;
    case MEDIUM:
      difficultyPoints = MEDIUM_POINTS;
      break;
    case HARD:
      difficultyPoints = HARD_POINTS;
      break;
    default:
      break;
    }
    const total = CORRECT_ANSWER_POINTS + (counter * difficultyPoints);
    this.saveRanking(total);
  }

  selectAnswer = (answer, difficulty) => {
    this.setState({
      correctAnswerClassName: 'correct-answer',
      wrongAnswerClassName: 'wrong-answers',
      nextQuestion: true,
    }, clearInterval(this.intervalId));
    if (answer) this.calculateTotal(difficulty);
  }

  switchQuestion = () => {
    let { questionNumber } = this.state;
    if (questionNumber < LAST_QUESTION_INDEX) {
      this.setState({
        wrongAnswerClassName: '',
        correctAnswerClassName: '',
        questionNumber: questionNumber += 1,
        counter: 30,
        nextQuestion: false,
      }, this.setTimer);
    } else this.setState({ feedback: true });
  }

  render() {
    const {
      questions, questionNumber, loading, correctAnswerClassName, wrongAnswerClassName,
      sortedAnswers, counter, nextQuestion, feedback,
    } = this.state;

    if (loading) return <h1>loading...</h1>;
    if (feedback) return <Redirect to="/feedback" />;
    const {
      category, correct_answer: correctAnswer, question, difficulty,
    } = questions[questionNumber];

    return (
      <>
        <Header />
        <main className="game_page">
          <span className="game_timer">{ counter }</span>
          <section className="question_section">
            <h3 className="question_title" data-testid="question-category">{category}</h3>
            <p className="question">{question}</p>
          </section>

          <section className="answer_section" data-testid="answer-options">
            {sortedAnswers[questionNumber].map((answer, index) => {
              // usa o mesmo index questionNumber da pergunta sendo exibida na tela "questions[questionNumber]"
              // passa pelo array de respostas da pergunta da vez, e monta os botões com as repostas
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    type="button"
                    className={ `answer_btn ${correctAnswerClassName}` }
                    data-testid="correct-answer"
                    onClick={ () => this.selectAnswer(true, difficulty) }
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
                  className={ `answer_btn ${wrongAnswerClassName}` }
                  onClick={ () => this.selectAnswer(false) }
                  disabled={ (counter === 0) } // se o estado counter for igual a 0 o disable passa a ser true
                >
                  {answer}
                </button>);
            })}
          </section>
          <section className="next_section">
            {
              (nextQuestion)
              && (
                <button
                  className="next_btn"
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.switchQuestion }
                >
                  Next
                </button>
              )
            }
          </section>
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveTokenProp: (token) => dispatch(saveToken(token)),
  saveUserScoreProp: (score) => dispatch(saveUserScore(score)),
  saveUserAssertionsProp: (assertions) => dispatch(saveUserAssertions(assertions)),
});

const mapStateToProps = ({ token, player }) => ({
  token,
  name: player.name,
  score: player.score,
  email: player.email,
  picture: player.score,
  assertions: player.assertions,
});

Game.propTypes = {
  saveTokenProp: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  saveUserScoreProp: PropTypes.func.isRequired,
  saveUserAssertionsProp: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
