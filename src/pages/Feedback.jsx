import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { MIN_ASSERTIONS } from '../helpers/consts';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      isRedirected: false,
    };
  }

  render() {
    const { assertions, score } = this.props;
    const { isRedirected } = this.state;
    if (isRedirected) return <Redirect to="/" />;
    return (
      <>
        <Header />
        <main className="feedback_page">
          <section className="score_section">
            <h3
              className="assertions"
              data-testid="feedback-total-question"
            >
              { `Assertions: ${assertions}` }
            </h3>
            <h3
              className="total_score"
              data-testid="feedback-total-score"
            >
              { `Score: ${score}` }
            </h3>
          </section>
          <section className="feedback_section">

            <h1 className="feedback_title" data-testid="feedback-text">Feedback</h1>

            {
              (assertions < MIN_ASSERTIONS) ? (
                <span
                  className="feedback_text"
                  data-testid="feedback-text"
                >
                  Could be better...
                </span>
              )
                : (
                  <span
                    className="feedback_text"
                    data-testid="feedback-text"
                  >
                    Well Done!
                  </span>
                )
            }
            <button
              className="playAgain_btn"
              type="button"
              data-testid="btn-play-again"
              onClick={ () => this.setState({
                isRedirected: true,
              }) }
            >
              Play Again

            </button>
          </section>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
