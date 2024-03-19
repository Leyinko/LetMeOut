import MemoryPath from '../../../../games/memoryPath/memoryPath';

const Repair = () => {
  // First Game
  MemoryPath();
  // Audio
  document.querySelector('audio').src = 'src/assets/audio/music/The-Trapper.mp3';
  document.querySelector('audio').play();
};

export default Repair;
