import Version from '../../../../components/atoms/Version/Version';
import menuSelection from '../MenuSelection/MenuSelection';
import './Main.css';

export const Main = () => {
  // App
  const app = document.querySelector('#app');

  // Main
  const main = document.createElement('section');
  main.id = 'main';
  app.append(main);

  // Title
  const title = document.createElement('h1');
  title.textContent = 'LET ME OUT';
  title.id = 'let-me-out';

  main.appendChild(title);

  // Menu Selection
  menuSelection(main);

  // Version
  Version('V1.0', main);
};

export default Main;
