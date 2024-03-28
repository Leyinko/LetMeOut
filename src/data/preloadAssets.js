const imagesArray = [
  '../assets/pictures/1F/BATHROOM-POINTED.png',
  '../assets/pictures/1F/KITCHEN-POINTED.png',
  '../assets/pictures/1F/LIVINGROOM-POINTED.png',
  '../assets/pictures/console/terminal-final.png',
  '../assets/pictures/console/terminal.png',
  '../assets/pictures/lobby/Lobby-2-2.png',
  '../assets/pictures/menu/Menu-16-9-2.png',
];

const audioArray = [
  '../assets/audio/music/Main-soundtrack.mp3',
  '../assets/audio/music/The-Prospector.mp3',
  '../assets/audio/music/The-Trapper.mp3',
];

const videoArray = ['..assets/Lose-animation.mp4'];

function preloadImages(array) {
  let i = 0;
  array.forEach((asset) => {
    const img = new Image();
    img.src = asset;
    img.addEventListener('load', () => i++);
  });
  return (i = array.length ? true : false);
}

function preloadAudio(array) {
  let i = 0;
  array.forEach((asset) => {
    const audio = new Audio();
    audio.src = asset;
    audio.addEventListener('load', () => i++);
  });
  return (i = array.length ? true : false);
}
function preloadVideo(array) {
  let i = 0;
  array.forEach((asset) => {
    const video = document.createElement('video');
    video.src = asset;
    video.preload = 'auto';
    video.load();
    video.addEventListener('load', () => i++);
  });
  return (i = array.length ? true : false);
}

export default function preloadAssets() {
  return [preloadImages(imagesArray), preloadAudio(audioArray), preloadVideo(videoArray)].every(Boolean);
}
