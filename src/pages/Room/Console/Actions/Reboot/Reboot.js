import sendRequest from '../../../../../data/webSocket/webSocket';
import './Reboot.css';

const Reboot = () => {
  // Parent
  let parent = document.querySelector('#reboot');

  if (!document.querySelector('#final-reboot')) {
    let container = document.createElement('div');
    container.id = 'final-reboot';

    parent.appendChild(container);

    container.innerHTML = `
			<input type="text" maxLength="1">
			<input type="text" maxLength="1">
			<input type="text" maxLength="1">
		`;

    // Inputs
    let inputs = document.querySelectorAll('#final-reboot input');

    inputs.forEach((input) => {
      input.addEventListener('keydown', (e) => {
        // e.key === 'Enter' && sendRequest('checkFinalCode');
        let code = `${inputs[0].value}${inputs[1].value}${inputs[2].value}`;
        e.key === 'Enter' && sendRequest('checkFinalCode', null, null, null, code);
      });
    });
  }
};

export default Reboot;
