import GameSelect from './utils/Party/Party';
import UserInfoField from '../../components/molecules/userField/UserInfoField';
import Menu from '../../components/atoms/menu/Menu';
import Version from '../../components/atoms/Version/Version';
import './Lobby.css';

export const Lobby = () => {
  // App
  const app = document.querySelector('#app');

  // Lobby
  const lobby = document.createElement('section');
  lobby.id = 'lobby';
  app.append(lobby);

  // Main Lobby Container
  const main = document.createElement('main');
  main.id = 'lobby-main';
  lobby.appendChild(main);

  // Lobby Selections Menus
  GameSelect('Create Party', 'create', UserInfoField('USERNAME', 'username'));
  GameSelect('JOin Party', 'join', UserInfoField('USERNAME', 'username'), UserInfoField('ROOM', 'room'));

  // General Menu
  Menu('BACK TO MAIN', 'back-to-main', lobby);

  // Version
  Version('V1.0', lobby);
};
