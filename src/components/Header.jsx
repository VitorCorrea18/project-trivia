import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <div className="header_div">
        <img
          className="header_img"
          src={ `https://www.gravatar.com/avatar/${email}` }
          alt="Gravatar Profile"
          data-testid="header-profile-picture"
        />
        <h2
          className="player_name"
          data-testid="header-player-name"
        >
          {` Player: ${name}`}
        </h2>
        <h2 className="player_score" data-testid="header-score">{`Score: ${score}`}</h2>
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
