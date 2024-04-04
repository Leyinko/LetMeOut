import { getRankings } from '../../../data/fetch';

export const opening_warning = {
  warning: 'WARNING: PLEASE READ BEFORE PLAYING',
  content: `The motion pictures contained in this video game are protected under the copyright laws of the United States and Other countries.
  This diskette is sold for home use only and all Other rights are expressly reserved by the copyright owner of such motion pictures.
  Any copying or public performance of such motion pictures is strictly prohibited and may subject the offender to civil liability and severe criminal penalties.

	A very small percentage of individuals may experience epileptic seizures when exposed to certain light patterns or flashing lights.
  Exposure to certain patterns or backgrounds on a computer screen, or while playing video games, may induce an epileptic seizure in these individuals.
  Certain conditions may induce previously undetected epileptic symptoms even in persons who have no history of prior seizures or epilepsy. 
  If you, or anyone in your family, have an epileptic condition, consult your physician prior to playing.
	
	If you experience any of the following symptoms while playing a video or computer game • dizziness, altered vision, eye or muscle twitches, loss of awareness, disorientation, any involuntary movement, or convulsions - IMMEDIATELY RECOMMEND THIS TO YOUR FRIENDS -
`,
  laws: '(Title 17, United States Code, Section 501 and 506)',
};

export const immersion_message = {
  image: '/assets/images/icons/menu/eye.svg',
  content: `
  This game is optimized for Full Screen window mode to ensure the best gameplay experience. 
  Playing in any other mode could potentially impact the gameplay.
  
  Please ensure that your display configuration is set to 100% scale and a resolution of 1920 x 1080 in your Display settings.
  This will ensure that the game's visuals are displayed correctly and provide an optimal gaming experience.
  
  Additionally, we recommend using headphones to enhance the immersive experience while playing.`,
  continue: 'Click to continue',
};

export const modals_main_template = {
  credits: () => {
    return 'COMING SOON';
  },
  scores: () => {
    return 'COMING SOON';
  },
  // scores: async () => {
  //   const ranking = await getRankings();

  //   console.log(ranking);

  //   const rankingModal = document.createElement('div');
  //   rankingModal.id = 'ranking-modal';

  //   ranking.forEach((rank) => {
  //     const position = document.createElement('ul');
  //     position.className = 'rank-position';

  //     const teamName = document.createElement('li');
  //     teamName.className = 'team-name';
  //     teamName.textContent = `${rank.teamName}`;

  //     const teamScore = document.createElement('li');
  //     teamScore.className = 'team-score';
  //     teamScore.textContent = `${rank.teamScore}`;

  //     const players = document.createElement('ul');
  //     players.className = 'ranking-players';

  //     rank.players.forEach((player) => {
  //       const playerScore = document.createElement('li');
  //       playerScore.textContent = `${player.name} - ${player.time}`;

  //       players.append(playerScore);
  //     });

  //     position.append(teamName, teamScore, players);
  //     rankingModal.appendChild(position);
  //   });

  //   return rankingModal;
  // },
};

export const introduction_lobby = {
  intro: `
  Somewhere in the Wildlands, you stumble upon a forsaken house.
  You find yourself locked in a room, separated from your friends.

  Your objective is to find your way out.

  All interactions and objects are crucial for the correct progression of the game.
  We highly recommend not using external communication tools.
  `,
};
