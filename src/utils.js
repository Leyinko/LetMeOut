export function generateRandomString() {
  const characters = 'ABCDEFHIJKLMNOPQRSTUVWXYZabcdefhijklmnpqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString.toUpperCase();
}

export async function copyText(id) {
  let text = document.getElementById(id).textContent;
  let temporal = document.createElement('textarea');
  temporal.value = text;
  document.body.appendChild(temporal);
  temporal.select();
  document.execCommand('copy');
  document.body.removeChild(temporal);
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

export const random = (length, quantity) => {
  let numbers = [];

  const uniqueRandom = () => {
    let random = Math.floor(Math.random() * length);
    if (!numbers.includes(random)) {
      numbers.push(random);
    } else {
      uniqueRandom();
    }
  };

  while (numbers.length < quantity) {
    uniqueRandom();
  }

  return numbers;
};

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
  return true;
}

export function timer(stamp) {
  let now = new Date().getTime();
  let time = Math.floor((now - stamp) / 1000);
  return time;
}
