import sendRequest from '../../../../../data/webSocket/webSocket';
import './Reboot.css';

const Reboot = () => {
  // Parent
  let parent = document.querySelector('#reboot');

  if (!document.querySelector('#final-reboot')) {
    let container = document.createElement('div');
    container.id = 'final-reboot';

    parent.appendChild(container);

    // Inputs
    let iteration = 1;
    while (iteration <= 3) {
      container.innerHTML += `<input type="text" maxLength="1">`;
      iteration++;
    }

    // Inputs
    let inputs = document.querySelectorAll('#final-reboot input');

    inputs.forEach((input) => {
      input.addEventListener('keydown', (e) => {
        let code = `${inputs[0].value}${inputs[1].value}${inputs[2].value}`;
        e.key === 'Enter' && sendRequest('checkFinalCode', null, null, null, code, null, null, null, true);
      });
    });
  }
};

export default Reboot;
