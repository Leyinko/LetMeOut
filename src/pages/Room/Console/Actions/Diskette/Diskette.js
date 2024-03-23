import Release from '../../../../../components/release/release';
import EthernetConnection from '../../../../games/ethernetConection/ethernetConnection';
import { inventoryModal } from '../../../Inventory/inventory';
import { createPasswordModal, createWindow } from '../../Console';
import './Diskette.css';

const Diskette = () => {
  // Parent
  let parent = document.querySelector('#window-usb');

  if (!document.querySelector('#files-explorer')) {
    // Container
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

  let blocks = 20;

  let download = setInterval(() => {
    let bar = document.querySelector('#download-usb');

    let block = document.createElement('div');
    block.className = 'downloading-block-usb';

    bar.appendChild(block);
    blocks--;

    // Files
    let ids = Array.from(document.querySelectorAll('[id*="usb-"].locked'));
    blocks % 5 === 0 && ids.at(0).classList.remove('locked');
    blocks === 0 && !clearInterval(download);
  }, 200);
}

const diskette_actions = {
  0: (e) => createWindow('ethernet-game', e.target.parentElement) && EthernetConnection(),
  1: () => inventoryModal('src/assets/images/pictures/console/USB/Doctor.png'),
  2: () => inventoryModal('src/assets/images/pictures/console/USB/DoctorAndDiana.jpg'),
  3: () => createPasswordModal('release', document.querySelector('#files-explorer'), Release),
};

export default Diskette;
