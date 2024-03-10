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
