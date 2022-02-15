import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveToken, saveName, saveEmail } from '../redux/actions/index'; // Action
import fetchToken from '../services/fetch';

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
    const { playerName, gravatarEmail } = this.state;
    const encryptedEmail = md5(gravatarEmail).toString();
    console.log(encryptedEmail);

    const { saveTokenProp, saveNameProp, saveEmailProp } = this.props;
    const data = await fetchToken();
    await saveTokenProp(data.token);
    this.saveTokenLocalStorage();
    saveNameProp(playerName);
    saveEmailProp(encryptedEmail);
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
  saveTokenProp: (token) => dispatch(saveToken(token)),
  saveNameProp: (name) => dispatch(saveName(name)),
  saveEmailProp: (gravatarEmail) => dispatch(saveEmail(gravatarEmail)),
});

const mapStateToProps = ({ token, name, gravatarEmail }) => ({
  token,
  name,
  gravatarEmail,
});

Login.propTypes = {
  saveNameProp: propTypes.func,
  saveTokenProp: propTypes.func,
  token: propTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
