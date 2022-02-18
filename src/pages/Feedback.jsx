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
        <h3 data-testid="feedback-total-question">{ assertions }</h3>
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <h1 data-testid="feedback-text">Feedback</h1>

        {
          (assertions < MIN_ASSERTIONS) ? (
            <span data-testid="feedback-text">Could be better...</span>
          )
            : (
              <span data-testid="feedback-text">Well Done!</span>
            )
        }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.setState({
            isRedirected: true,
          }) }
        >
          Play Again

        </button>
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
