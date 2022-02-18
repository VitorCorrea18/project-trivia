import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { MIN_ASSERTIONS } from '../helpers/consts';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <div>
          {
            (assertions < MIN_ASSERTIONS) ? (
              <span data-testid="feedback-text">Could be better...</span>
            )
              : (
                <span data-testid="feedback-text">Well Done!</span>
              )
          }
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
