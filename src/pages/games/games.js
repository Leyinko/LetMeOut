import { fetchFinalCode } from '../../data/fetch';

export async function showFinalNumber() {
  const container = document.querySelector('#repair');
  const finalNumberModal = document.createElement('h3');
  finalNumberModal.className = 'final-number';

  // Print
  finalNumberModal.textContent = String(await fetchFinalCode());

  document.querySelector('#smash-container').remove();

  container.appendChild(finalNumberModal);
}
