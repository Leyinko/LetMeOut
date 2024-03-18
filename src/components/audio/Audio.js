const sounds = [
  'src/assets/audio/sounds/random/door-knocking.mp3',
  'src/assets/audio/sounds/random/door-slam.mp3',
  'src/assets/audio/sounds/random/footsteps.mp3',
  'src/assets/audio/sounds/random/glass-breaking.mp3',
  'src/assets/audio/sounds/random/window-knocking.mp3',
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
}

export function stopSound(sound) {
  sound.pause();
}

export function randomSounds() {
  const interval = setInterval(() => {
    console.log('se ejecut');
    const soundProbabilities = Math.floor(Math.random() * 100);

    if (soundProbabilities <= 20) {
      const sound = Math.floor(Math.random() * sounds.length - 1);

      const soundEffect = new Audio(sounds[sound]);

      console.log('ahora suena');

      playSound(soundEffect);
    }
  }, 20000);
}
