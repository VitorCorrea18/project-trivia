import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  render() {
    const { name, email } = this.props;
    const { score } = this.state;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${email}` }
          alt="Gravatar Profile"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">{score}</h2>
      </div>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string,
}.isRequired;

function mapStateToProps(state) {
  return {
    name: state.playerReducer.name,
    email: state.playerReducer.email,
  };
}

export default connect(mapStateToProps)(Header);
