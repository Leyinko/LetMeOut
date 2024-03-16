import { denied, granted } from '../Room/Progression/Progression';
import './games.css';

export function start(win, callback) {
  if (win == 'win') {
    granted();
  } else if (win == 'lose') {
    denied();
  } else {
    console.log('Posible sonido de inicio');
  }
  var stageTimeout = setTimeout(() => {
    clearTimeout(stageTimeout);
    callback();
  }, 2000);
}
