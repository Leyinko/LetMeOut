import MemoryPath from '../../../../games/memoryPath/memoryPath';
import Smash from '../../../../games/smashThatTrash/Smash';

const Repair = () => {
  // First Game
  // MemoryPath();
  Smash();

  // Soundtrack Change
  let audio = document.querySelector('audio');
  audio.pause();

  setTimeout(() => {
    audio.src = 'src/assets/audio/music/The-Trapper.mp3';
    audio.play();
  }, 1600);
};

export default Repair;
