import Release from './Release/Release';
import EthernetConnection from '../../../../games/ethernetConection/ethernetConnection';
import { inventoryModal } from '../../../Inventory/inventory';
import { createPasswordModal, createWindow } from '../../Console';
import './Diskette.css';

const Diskette = () => {
  // Parent
  let parent = document.querySelector('#window-usb');

  if (!document.querySelector('#files-explorer')) {
    let container = document.createElement('div');
    container.id = 'files-explorer';

    parent.appendChild(container);
    // Files
    let number = 0;
    while (number < 4) {
      const collider = document.createElement('div');
      collider.id = `usb-${number}`;
      collider.className = 'locked';

      collider.addEventListener('click', (e) => diskette_actions[e.target.id.match(/\d/)[0]](e));

      container.appendChild(collider);
      number++;
    }
    // Download
    downloadFiles(parent);
  }
};

function downloadFiles(parent) {
  const bar = document.createElement('div');
  bar.id = 'download-usb';
  parent.appendChild(bar);

  let blocks = 24;

  // ! Unlock First App -> PROGRESSION !
  document.querySelector('#usb-0').classList.remove('locked');

  let download = setInterval(() => {
    let progression = document.querySelector('#download-usb');

    if (progression) {
      let block = document.createElement('div');
      block.className = 'downloading-block-usb';

      progression && progression.appendChild(block);
      blocks--;

      // Files
      let ids = Array.from(document.querySelectorAll('[id*="usb-"].locked'));
      blocks % 8 === 0 && ids.at(0).classList.remove('locked');
      blocks === 0 && !clearInterval(download);
    } else {
      clearInterval(download);
    }
  }, 30000);
}

const diskette_actions = {
  0: (e) => createWindow('ethernet-game', e.target.parentElement) && EthernetConnection(),
  1: () => inventoryModal('/assets/images/pictures/console/USB/Doctor.png'),
  2: () => inventoryModal('/assets/images/pictures/console/USB/DoctorAndDiana.jpg'),
  3: () => createPasswordModal('release', document.querySelector('#files-explorer'), Release),
};

export default Diskette;
