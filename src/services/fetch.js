const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

// essa fetch é pra pegar o token, e podemos fazer a outra aqui mesmo depois
export const fetchToken = async () => {
  try {
    const response = await fetch(URL_TOKEN);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchQuestion = async (token) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
