import Loader from '../components/loader/Loader';
import Launch from '../pages/Main/Opening';
import { createPasswordModal } from '../pages/Room/Console/Console';

const assets = [
  [
    '/assets/images/logos/Loader.gif',
    '/assets/images/pictures/menu/Menu-16-9-2.png',
    '/assets/images/pictures/storyNotes/1.png',
    '/assets/images/pictures/storyNotes/2.png',
    '/assets/images/pictures/storyNotes/3.png',
    '/assets/images/pictures/storyNotes/4.png',
    '/assets/images/pictures/storyNotes/5.png',
    '/assets/images/pictures/storyNotes/6.png',
    '/assets/images/pictures/storyNotes/7.png',
    '/assets/images/pictures/storyNotes/8.png',
    '/assets/images/pictures/storyNotes/9.png',
    '/assets/images/pictures/lobby/Lobby-2-2.png',
    '/assets/images/pictures/lobby/Hands-1-2.gif',
    '/assets/images/pictures/1F/BATHROOM-POINTED.png',
    '/assets/images/pictures/1F/KITCHEN-POINTED.png',
    '/assets/images/pictures/1F/LIVINGROOM-POINTED.png',
    '/assets/images/pictures/console/terminal.png',
    '/assets/images/pictures/console/Windows/chat.png',
    '/assets/images/pictures/console/Windows/diskette.png',
    '/assets/images/pictures/console/USB/DoctorAndDiana.jpg',
    '/assets/images/pictures/console/USB/Doctor.png',
    '/assets/images/pictures/console/Windows/ethernet.png',
    '/assets/images/pictures/console/Windows/ethernet-success.png',
    '/assets/images/pictures/console/Windows/fix.png',
    '/assets/images/pictures/console/Windows/fixed.png',
    '/assets/images/pictures/console/Windows/reboot.png',
    '/assets/images/pictures/console/Windows/time-transfer.png',
    '/assets/images/pictures/console/Windows/time-transferred.png',
    '/assets/images/pictures/enigmas/polaroids/Polaroid-bathroom.png',
    '/assets/images/pictures/enigmas/polaroids/Polaroid-kitchen.png',
    '/assets/images/pictures/enigmas/polaroids/Polaroid-living.png',
    '/assets/images/pictures/enigmas/tickets/Ticket1-01500017.png',
    '/assets/images/pictures/enigmas/tickets/Ticket2-33110713.png',
    '/assets/images/pictures/enigmas/tickets/Ticket3-42302070.png',
    '/assets/images/pictures/console/terminal-final.png',
  ],
  [
    '/assets/audio/music/Main-soundtrack.mp3',
    '/assets/audio/music/The-Prospector.mp3',
    '/assets/audio/music/The-Trapper.mp3',
  ],
];

// Assets Preload (Loader %)
export function preloadAndLaunch() {
  const app = document.querySelector('#app');
  let length = 0;
  let loaded = undefined;

  Loader(app);

  let percentage = document.createElement('span');
  percentage.className = 'loading-percentage';
  app.appendChild(percentage);

  assets.forEach((type) => {
    type.forEach((asset) => {
      /.mp3$/.test(asset) ? (loaded = new Audio()) : (loaded = new Image());
      loaded.src = asset;

      loaded.addEventListener('load', () => {
        length++;
        percentage.textContent = `LOADING... ${Math.floor((length / 35) * 100)}%`;
        length === 35 && percentage.remove();
      });
    });
  });

  window.addEventListener('load', () => {
    document.querySelector('.loader').remove();
    createPasswordModal('access', app, Launch);
  });
}

export function preloadVideo(result, src) {
  const animation = document.createElement('video');

  Object.assign(animation, {
    id: `${result}-video`,
    autoplay: true,
    volume: 0,
    controls: false,
    preload: 'auto',
    src: src,
  });

  animation.load();
  return animation;
}
