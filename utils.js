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
