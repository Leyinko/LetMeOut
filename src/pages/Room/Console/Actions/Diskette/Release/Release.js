import { GameResult } from '../../../../../Result/Result';
import { accessSound, audioConfig, playSound } from '../../../../../../components/audio/Audio';
import './Release.css';

const errorAudio = new Audio('/assets/audio/sounds/console/error.mp3');

const errorWindows = [
  '/assets/images/pictures/console/Errors-windows-release/Error1.png',
  '/assets/images/pictures/console/Errors-windows-release/Error2.png',
  '/assets/images/pictures/console/Errors-windows-release/Error3.png',
  '/assets/images/pictures/console/Errors-windows-release/Error4.png',
];
const subtitles = [
  '[CROWD PANIC]',
  '- I cannot get out of my -',
  '- I think I heard ...',
  `- ... my door is locked -`,
  '- Help me, I cannot find my daughter ...',
  '[EMERGENCY SOUND]',
  `- 911, What's your emergency?`,
  `- I don't know where he is -`,
  `- ... they are gone ... she's got ...`,
];
const thanksMessage = `
Dear player, thank you...
You found the hidden ending.
This shows not only that you like the game, 
but also that you appreciated Let Me Out the way we had hoped ♥
`;

const errors = 20;
let counterBugs = 0;
let intervalTime = 700;

const Release = () => {
  const screen = document.getElementById('screen');
  let audio = document.querySelector('audio');

  //Bugs creation
  const bugsArea = document.createElement('div');
  bugsArea.className = 'bugs-area';
  screen.appendChild(bugsArea);
  //
  audio.pause();
  accessSound('access-granted');
  document.querySelector('#countdown-timer').remove();

  setTimeout(() => createErrorWindow(bugsArea), 1000);
  return true;
};

// Create bugs
function createBug(bugsArea) {
  const randomError = Math.floor(Math.random() * errorWindows.length);
  const bug = document.createElement('img');
  bug.className = 'bug';
  bug.src = errorWindows[randomError];
  bug.alt = 'console_bug';

  bug.style.top = `${Math.floor(Math.random() * 80)}%`;
  bug.style.bottom = `${Math.floor(Math.random() * 80)}%`;
  bug.style.left = `${Math.floor(Math.random() * 80)}%`;
  bug.style.right = `${Math.floor(Math.random() * 80)}%`;

  playSound(errorAudio);

  bugsArea.append(bug);
}

// Hidden Ending
function createErrorWindow(bugsArea) {
  if (counterBugs < errors) {
    setTimeout(() => {
      counterBugs++;
      createBug(bugsArea);
      intervalTime = Math.floor((intervalTime /= 1.1));
      createErrorWindow(bugsArea);
    }, intervalTime);
  } else if (counterBugs == errors) {
    setTimeout(() => {
      let deploying = document.createElement('img');
      deploying.src = '/assets/images/pictures/console/Errors-windows-release/deploying.gif';
      deploying.className = 'deploying';

      document.querySelector('.bugs-area').appendChild(deploying);
    }, 100);

    setTimeout(() => {
      worldwideRelease();
    }, 500);
  }
}

// Animation
export function worldwideRelease() {
  const app = document.querySelector('#app');
  const room = document.querySelector('#room');
  const terminal = document.querySelector('#terminal');
  const timer = document.querySelector('#countdown-timer');

  let audio = document.querySelector('audio');
  audio.pause();
  audio.src = '/assets/audio/sounds/console/final-alternative-2.mp3';

  audioConfig(audio, true, false, 0.7);

  audio.addEventListener('ended', () =>
    setTimeout(() => {
      app.innerHTML = '';
      GameResult(true);
    }, 1000)
  );

  setTimeout(() => {
    room.style.animation = 'glitch 0.7s ease-in-out';
    terminal.style.animation = 'glitch 0.7s ease-in-out';
  }, 1400);

  setTimeout(() => {
    timer && timer.remove();
    room.remove();
    terminal.remove();
  }, 1900);

  setTimeout(() => {
    // Subtitles
    let container = document.createElement('div');
    container.id = 'subtitles';

    let subtitle = document.createElement('span');

    container.appendChild(subtitle);
    app.appendChild(container);

    setTimeout(() => {
      let index = 0;
      const lines = setInterval(() => {
        subtitle.textContent = subtitles[index];
        index++;
        // TEST
        if (!subtitles[index]) {
          clearInterval(lines);

          setTimeout(() => {
            container.remove();

            // Thanks Message
            setTimeout(() => {
              let thanks = document.createElement('div');
              thanks.id = 'thanks-container';

              thanks.innerHTML = `
              <img src="/assets/images/logos/FAVICON.png">
                <h1>SPECIAL THANKS</h1>
                <p>${thanksMessage}</p>
              `;

              app.appendChild(thanks);
            }, 300);
          }, 2500);
        }
      }, 1110);
    }, 1500);
  }, 1902);
}

export default Release;
