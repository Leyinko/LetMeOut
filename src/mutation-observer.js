export function mutationObserver(query, callback) {
  let element = document.querySelector(`#${query}`);
  // Observer
  let observer = new MutationObserver(function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        callback();
        // Stop Observing
        observer.disconnect();
      }
    }
  });
  // Configuration
  let config = { childList: true };
  // Start observing
  observer.observe(element, config);
}
