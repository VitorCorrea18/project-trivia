import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { saveToken } from '../redux/actions/index'; // Action
import fetchToken from '../services/fetch';
import { Link } from 'react-router-dom';

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

  saveTokenLocalStorage = () => {
    const { token } = this.props;
    localStorage.setItem('token', token);
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { saveTokenProp } = this.props;
    const data = await fetchToken();
    await saveTokenProp(data.token);
    this.saveTokenLocalStorage();
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
            type="text"
            placeholder="Nome"
            value={ playerName }
            onChange={ this.handleChange }
          />
          <input
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="E-mail Gravatar"
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
        <div>
          <Link
            to="/settings"
            data-testid="btn-settings"
          >
            Configurações
          </Link>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // fetchTokenThunkProp: () =>localStorage.setItem('token', data.token)); dispatch(fetchTokenThunk()),
  saveTokenProp: (token) => dispatch(saveToken(token)),
});

const mapStateToProps = ({ token }) => ({
  token,
});

Login.propTypes = {
  // fetchTokenThunkProp: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  saveTokenProp: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
