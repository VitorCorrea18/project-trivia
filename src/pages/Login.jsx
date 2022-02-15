import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { fetchTokenThunk } from '../redux/actions/index';
// import fetchToken from '../services/fetch';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      gravatarEmail: '',
      isBtnDisabled: true,
      isLogged: false,
    };
  }

  checkInput = () => {
    const { playerName, gravatarEmail } = this.state;

    if (playerName.length > 0 && gravatarEmail.length > 0) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.checkInput);
  };

  saveToken = () => {
    const { token } = this.props;
    localStorage.setItem('token', token);
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { fetchTokenThunkProp } = this.props;
    // const token = await fetchToken();
    fetchTokenThunkProp();

    this.saveToken();
    this.setState({ isLogged: true });
  };

  render() {
    const { playerName, gravatarEmail, isBtnDisabled, isLogged } = this.state;
    if (isLogged) return <Redirect to="/game" />;
    return (
      <main>
        <form onSubmit={ this.handleLogin } action="">
          <input
            data-testid="input-player-name"
            name="playerName"
            type="email"
            placeholder="Email do Gravatar"
            value={ playerName }
            onChange={ this.handleChange }
          />
          <input
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            type="text"
            placeholder="Nome do Jogador"
            value={ gravatarEmail }
            onChange={ this.handleChange }
          />
          <button
            disabled={ isBtnDisabled }
            name="btnPlay"
            data-testid="btn-play"
            type="submit"
          >
            Jogar!
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTokenThunkProp: () => dispatch(fetchTokenThunk()),
  // saveTokenProp: () => dispatch(saveToken()),
});

const mapStateToProps = ({ tokenReducer }) => ({
  token: tokenReducer.token,
});

Login.propTypes = {
  fetchTokenThunkProp: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
