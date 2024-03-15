export function showFinalNumber() {
  const container = document.querySelector('#repair');
  const finalNumberModal = document.createElement('h2');
  finalNumberModal.className = 'final-number';
  finalNumberModal.textContent = '3';

  document.querySelector('#smash-container').remove();

  container.appendChild(finalNumberModal);
}
