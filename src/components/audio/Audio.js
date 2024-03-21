const random_sounds = [
  'src/assets/audio/sounds/random/door-knocking.mp3',
  'src/assets/audio/sounds/random/door-slam.mp3',
  'src/assets/audio/sounds/random/footsteps.mp3',
  'src/assets/audio/sounds/random/glass-breaking.mp3',
  'src/assets/audio/sounds/random/window-knocking.mp3',
  'src/assets/audio/sounds/random/breathing.mp3',
  'src/assets/audio/sounds/random/wood-cracking.mp3',
];

export function audioConfig(target, autoplay, loop, volume) {
  Object.assign(target, {
    preload: 'auto',
    autoplay: autoplay,
    loop: loop,
    volume: volume,
  });
}

export function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
  return true;
}

export function stopSound(sound) {
  sound.pause();
}

export function randomSounds() {
  const interval = setInterval(() => {
    const probabilities = Math.floor(Math.random() * 100);

    if (probabilities <= 10) {
      const index = Math.floor(Math.random() * random_sounds.length - 1);
      const sound = new Audio(random_sounds[index]);
      playSound(sound);
    }
    // End
    !document.querySelector('#room') && clearInterval(interval);
  }, 20000);
}
