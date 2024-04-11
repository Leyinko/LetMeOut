import MemoryPath from '../../../../games/memoryPath/memoryPath';
import { difficulty_settings } from '../../../Progression/Difficulty';
import { difficulty } from '../../../Room';
import './Repair.css';

const Repair = () => {
  // Soundtrack Change
  let audio = document.querySelector('audio');
  audio.pause();

  audio.src = '/assets/audio/music/The-Trapper.mp3';
  audio.play();

  setTimeout(() => {
    // Hidden Ending Signals
    let parent = document.querySelector('#repair');
    let length = difficulty_settings[difficulty].alternative;

    let controller = document.createElement('div');
    controller.id = 'error-games-controller';

    parent.appendChild(controller);

    for (let i = 0; i < length; i++) {
      let dot = document.createElement('p');
      dot.className = 'green';
      controller.appendChild(dot);
    }

    // Launch Game
    MemoryPath();
  }, 900);
};

export default Repair;
