import Button from '../../../../components/button/Button';
import { getRankings } from '../../../../data/fetch';
import './Modal.css';

const createModal = async (id, parent) => {
  const modal = document.createElement('article');
  modal.id = `${id}-modal`;
  modal.className = 'modal';

  modal.append(await rankingPrintHTML());

  Button('X', 'close-modal-button', 'close-modal-main', 'button', modal);

  parent.append(modal);

  const close = document.querySelector('.close-modal-button');
  close.addEventListener('click', () => modal.remove());
};

async function rankingPrintHTML() {
  let scores = [
    { teamName: 'TEAM', teamScore: 'SCORE', difficulty: 'MODE', players: [{ name: 'PLAYERS' }] },
    ...(await getRankings()),
  ];

  const container = document.createElement('div');
  container.id = 'ranking-modal';

  const title = document.createElement('h2');
  title.textContent = 'LEADERBOARD';

  const ranking = document.createElement('ul');
  ranking.className = 'ranking';

  container.append(title, ranking);

  scores.forEach((rank, index) => {
    const position = document.createElement('li');
    position.className = `#${index}`;

    position.innerHTML = `
      <span>${index === 0 ? '#' : index}</span>
      <p>${rank.teamName}</p>
      <h3>${rank.teamScore}</h3>
      <h3>${rank.difficulty.toUpperCase()}</h3>
    `;

    const players = document.createElement('div');
    players.className = 'ranking-players';

    rank.players.forEach((player) => {
      players.innerHTML += `<h5>${player.name.toUpperCase()}</h5>`;
    });

    position.appendChild(players);
    ranking.appendChild(position);
  });

  return container;
}

export default createModal;
