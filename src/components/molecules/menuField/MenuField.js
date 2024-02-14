import Menu from '../../atoms/menu/Menu';
import './MenuField.css';

const menuField = (parent) => {
  const menuField = document.createElement('div');
  menuField.id = 'menu-field';

  Menu('START', 'start-button', menuField);
  Menu('INSTRUCTIONS', 'instructions-button', menuField);
  Menu('CREDITS', 'credits-button', menuField);

  parent.append(menuField);
};

export default menuField;
