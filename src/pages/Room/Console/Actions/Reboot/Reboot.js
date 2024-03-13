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
  }
};

export default Reboot;
