export function generateRandomString() {
  const characters = 'ABCDEFHIJKLMNOPQRSTUVWXYZabcdefhijklmnpqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString.toUpperCase();
}

export function copyText() {
  let code = document.querySelector('.room-code').textContent;
  navigator.clipboard.writeText(code);
}

export function fisherYatesShuffle(arr) {
  let length = arr.length;
  for (let i = length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export const random = (length) => Math.floor(Math.random() * length);

export const soundFadeOut = (audio) => {
  let duration = audio.duration - audio.currentTime;
  let fadeStep = 0.4;
  if (duration < 3) {
    const fadeOutInterval = setInterval(() => {
      if (duration < 3 && audio.volume > 0.1) {
        audio.volume -= fadeStep;
      } else {
        audio.volume = 0;
        clearInterval(fadeOutInterval);
      }
    }, 20);
  }
};

export function animationReflow(element, animation) {
  element.style.animation = animation;
  void element.offsetWidth;
  element.style.animation = '';
}
