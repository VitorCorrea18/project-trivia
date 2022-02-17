import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveToken } from '../redux/actions/index';
import { fetchQuestion, fetchToken } from '../services/fetch';
import Header from '../components/Header';

const NUMBER = 0.5;
const EXPIRED_TOKEN_CODE = 3;

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

  getToken = async () => {
    const { saveTokenProp } = this.props;
    const newToken = await fetchToken();
    localStorage.setItem('token', newToken.token);
    saveTokenProp(newToken.token);
    this.getQuestions();
  }

  getQuestions = async () => {
    const token = localStorage.getItem('token');
    const data = await fetchQuestion(token);

    if (data.response_code === EXPIRED_TOKEN_CODE) {
      this.getToken();
    } else {
      this.setState({
        questions: data.results,
        loading: false,
      });
    }
  }

  render() {
    const { questions, questionNumber, loading } = this.state;
    if (loading) return <h1>loading...</h1>;
    const {
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
      question,
    } = questions[questionNumber];

    let allAnswer = [correctAnswer, ...incorrectAnswer];
    allAnswer = allAnswer.sort(() => Math.random() - NUMBER); // comentar a fonte

    return (
      <>
        <Header />
        <main>
          {console.log(allAnswer)}
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
