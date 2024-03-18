export function showFinalNumber() {
  const container = document.querySelector('#repair');
  const finalNumberModal = document.createElement('h3');
  finalNumberModal.className = 'final-number';

  // User Data
  let lobbyCode = JSON.parse(localStorage.getItem('data')).lobbyCode;
  let id = document.querySelector('.id').textContent;

  fetch(`http://localhost:3000/final-code?lobbyCode=${lobbyCode}&id=${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: [['Content-Type', 'application/json']],
  })
    .then((response) => response.json())
    .then((res) => {
      // Print
      finalNumberModal.textContent = String(res.finalCode);
    })
    .catch((error) => console.log(error));

  document.querySelector('#smash-container').remove();

  container.appendChild(finalNumberModal);
}
