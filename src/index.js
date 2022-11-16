import './index.css';

// ------------ API ------------ //

const baseUrl = process.env.BASE_URL;
const gameId = process.env.GAME_ID;

const getScores = async () => {
  try {
    const response = await fetch(`${baseUrl}/games/${gameId}/scores/`);
    const data = await response.json();
    return data.result;
  } catch (e) {
    return `Error: ${e}`;
  }
};

const addScore = async (user, score) => {
  try {
    const request = await fetch(`${baseUrl}/games/${gameId}/scores/`, {
      method: 'POST',
      body: JSON.stringify({
        user,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const response = await request.json();

    return response.result;
  } catch (e) {
    return e;
  }
};

const socresList = document.querySelector('.scores');
const displayScores = async () => {
  const scores = await getScores();
  socresList.innerHTML = '';
  scores.forEach((score) => {
    socresList.innerHTML += `
      <li>
        <p>${score.user}: ${score.score}</p>
      </li>
    `;
  });
};
document.addEventListener('DOMContentLoaded', displayScores);

const refreshButton = document.querySelector('button[type="button"]');
refreshButton.addEventListener('click', displayScores);

const form = document.querySelector('.form-container');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  await addScore(nameInput.value, parseFloat(scoreInput.value));
  form.reset();
});
