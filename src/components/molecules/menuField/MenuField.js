import Button from '../../atoms/button/Button';
import './MenuField.css';

const menuField = () => {
  const menuField = document.createElement('div');
  menuField.id = 'menu-field';

  Button('START', 'start-button', 'submit', menuField);
  Button('INSTRUCTIONS', 'instructions-button', 'submit', menuField);
  Button('CREDITS', 'credits-button', 'submit', menuField);

  const intro = document.querySelector('#intro');
  intro.append(menuField);
};

export default menuField;