import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      gravatarEmail: '',
      isBtnDisabled: true,
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

  render() {
    const { playerName, gravatarEmail, isBtnDisabled } = this.state;
    return (
      <main>
        <form action="">
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
        <div>
          <Link
            to="/settings"
            data-testid="settings-title"
          >
            Configurações
          </Link>
        </div>
      </main>
    );
  }
}
