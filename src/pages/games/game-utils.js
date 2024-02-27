export function start(displayStage, node, callback, className) {
  const displayMessage = document.createElement('h2');
  displayMessage.classList.add(className);

  if (!displayStage) {
    let timer = 3;
    const starInterval = setInterval(() => {
      if (timer > 0) {
        displayMessage.textContent = timer.toString();
        timer--;
        node.appendChild(displayMessage);
      } else {
        clearInterval(starInterval);
        node.removeChild(displayMessage);
        callback();
      }
    }, 1000);
  } else {
    displayMessage.textContent = displayStage;
    node.appendChild(displayMessage);
    var stageTimeout = setTimeout(() => {
      displayMessage.remove();
      clearTimeout(stageTimeout);
      start(false, node, callback, className);
    }, 1000);
  }
}
