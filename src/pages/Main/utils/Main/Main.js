import Version from '../../../../components/version/Version';
import { Inventory } from '../../../Room/Inventory/inventory';
import menuSelection from '../MenuSelection/MenuSelection';
import './Main.css';

export const Main = () => {
  // App
  const app = document.querySelector('#app');

  // Main
  const main = document.createElement('section');
  main.id = 'main';
  app.append(main);

  // Menu Selection
  menuSelection(main);
  let selections = document.querySelector('#menu-field');

  // Version
  Version('V2.0', main);

  // First Animation
  openingAnimation(main, selections);

  // Reset for New Game
  localStorage.removeItem('data');
  localStorage.removeItem('stats');
};

function openingAnimation(...args) {
  let elements = [...args];
  let audio = document.querySelector('#app audio');
  elements.forEach((element) => (!audio ? element.classList.add('first-pop') : element.classList.remove('first-pop')));
}

export default Main;
