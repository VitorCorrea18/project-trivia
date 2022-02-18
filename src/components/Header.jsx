import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
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

function mapStateToProps({ player }) {
  return {
    name: player.name,
    email: player.email,
    score: player.score,
  };
}

export default connect(mapStateToProps)(Header);
