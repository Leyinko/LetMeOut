const Audio = (src, loop = false, autoplay = false) => {
  const audio = document.createElement('audio');
  audio.preload = 'auto';
  audio.src = src;
  audio.loop = loop;
  audio.autoplay = autoplay;
  return audio;
};

export default Audio;

export function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
