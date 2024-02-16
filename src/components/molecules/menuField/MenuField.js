import { playSound } from '../../atoms/audio/Audio';
import Menu from '../../atoms/menu/Menu';
import './MenuField.css';

const hoverMenu = '../../../../src/assets/audio/sounds/main/Menu-hover.mp3';

const menuField = (parent) => {
  const menuField = document.createElement('div');
  menuField.id = 'menu-field';

  Menu('START', 'start-button', menuField);
  Menu('INSTRUCTIONS', 'instructions-button', menuField);
  Menu('CREDITS', 'credits-button', menuField);

  const menuItems = document.querySelectorAll('menu-field');
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener('mouseenter', playSound(hoverMenu));
  });

  parent.append(menuField);
};

export default menuField;
