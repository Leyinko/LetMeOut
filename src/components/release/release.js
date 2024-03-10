import './release.css';

const Release = () => {
  const screen = document.getElementById('screen');
  const bugsArea = document.createElement('div');
  bugsArea.className = 'bugs-area';
  screen.appendChild(bugsArea);

  const errors = 50;
  let counterBugs = 0;

  const createBug = () => {
    const bug = document.createElement('img');
    bug.className = 'bug';
    bug.src = '../../../src/assets/images/pictures/console/Windows/time-transfer.png';
    bug.alt = 'console bug';

    bug.style.top = `${Math.floor(Math.random() * 80)}%`;
    bug.style.bottom = `${Math.floor(Math.random() * 80)}%`;
    bug.style.left = `${Math.floor(Math.random() * 80)}%`;
    bug.style.right = `${Math.floor(Math.random() * 80)}%`;

    bugsArea.append(bug);

    counterBugs++;
    console.log(counterBugs);

    if (counterBugs === errors) {
      clearInterval(bugs);
      setTimeout(createIANAGif, 3000);
    }
  };

  const createIANAGif = () => {
    const IANAGif = document.createElement('img');
    IANAGif.className = 'IANA-gif';
    IANAGif.src = '../../../../src/assets/images/logos/IANA-logo.gif';
    IANAGif.alt = 'IANA Logo gif';
    bugsArea.appendChild(IANAGif);

    setTimeout(() => {
      IANAGif.remove();
      createIANALogo();
    }, 3000);
  };

  const createIANALogo = () => {
    const IANALogo = document.createElement('img');
    IANALogo.className = 'IANA-logo';
    IANALogo.src = '../../../../src/assets/images/logos/IANA-logo.png';
    IANALogo.alt = 'IANA Logo';
    bugsArea.appendChild(IANALogo);

    const IANAMessage = document.createElement('h2');
    IANAMessage.textContent = 'Thanks for freeing me on the web';
    bugsArea.appendChild(IANAMessage);
  };

  const bugs = setInterval(createBug, 250);
};

export default Release;
