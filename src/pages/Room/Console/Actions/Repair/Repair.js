import MemoryPath from '../../../../games/memoryPath/memoryPath';

const Repair = () => {
  // Soundtrack Change
  let audio = document.querySelector('audio');
  audio.pause();

  setTimeout(() => {
    // First Game
    MemoryPath();

    audio.src = '/assets/audio/music/The-Trapper.mp3';
    audio.play();
  }, 1600);
};

export default Repair;
