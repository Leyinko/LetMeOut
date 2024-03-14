import './games.css';

export function start(win, callback) {
  console.log(win);
  var stageTimeout = setTimeout(() => {
    clearTimeout(stageTimeout);
    callback();
  }, 2000);
}
