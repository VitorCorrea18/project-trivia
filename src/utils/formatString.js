/* eslint-disable quotes */
const formatQuotes = (data) => {
  const formated = data.map((result) => {
    // eslint-disable-next-line camelcase
    const { question, correct_answer, incorrect_answers } = result;
    const formatedQ = question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
      .replace(/&eacute;/, 'é');
    const formatedC = correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
      .replace(/&eacute;/, 'é');
    const formatedI = incorrect_answers.map((answer) => (
      answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/, 'é')));
    return {
      ...result,
      question: formatedQ,
      correct_answer: formatedC,
      incorrect_answers: formatedI,
    };
  });
  return formated;
};

export default formatQuotes;
