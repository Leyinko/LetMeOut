import './Smash.css';

function Smash() {
  // App
  const gamesModal = document.querySelector('.games-modal');
  const container = document.createElement('section');
  container.id = 'smash-container';

  gamesModal.appendChild(container);

  // Buttons
  let buttons = 0;
  let rotation = 22.5;

  while (buttons < 8) {
    let button = document.createElement('div');
    button.id = `B${buttons + 1}`;
    button.style.transform = `rotate(${rotation}deg)`;
    button.style.position = 'absolute';

    container.appendChild(button);

    button.addEventListener('click', (e) => {
      !e.target.classList.contains('active') && alert('Bitch you failed');
    });

    buttons++;
    rotation += 45;
  }
}

function startGame() {
  // Difficulty
  let stage = 1;
  let interval = 800;

  // Random Sequence
  let array = [];

  for (let i = 0; i < 15; i++) {
    let randomIndex = Math.floor(Math.random() * 8) + 1;
    let query = `#B${randomIndex}`;
    array.push(query);
  }

  const stageStart = setInterval(() => {
    let index = array.at(-1);
    let element = document.querySelector(`${index}`);

    let click = false;

    if (index) {
      array.pop(index);
      element.classList.add('active');

      element.addEventListener(
        'animationend',
        () => {
          element.classList.remove('active');
          void element.offsetWidth;
          !click && console.log('You didnt click');
        },
        { once: true }
      );
      element.addEventListener('click', (e) => (click = true));
    }
  }, interval);
}

export default Smash;
