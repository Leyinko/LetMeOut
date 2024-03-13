import Games from '../../../../games/games';

const Repair = () => {
  let container = document.querySelector('#repair');
  let games = document.querySelector('.games-modal');

  !games && Games(container);
};

export default Repair;
