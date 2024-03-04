// Collectables
export function addNoteToCollectables(item) {
  let collection = JSON.parse(localStorage.getItem('story')) || [];
  let note = item.match(/\d/)[0];

  !collection.includes(note) && collection.push(note);

  localStorage.setItem('story', JSON.stringify(collection));
}

export const getCollectables = () => JSON.parse(localStorage.getItem('story'));

// Game Data
export function storeGameData(data, player) {
  let start = { ...data, username: player };
  localStorage.setItem('data', JSON.stringify(start));
}

export function getLocalID() {
  let data = JSON.parse(localStorage.getItem('data'));
  let user = data && data.username;

  return data && data.players.find((player) => player.name === user).id;
}

// //! CLICK COUNTER ON SCREEN

// document.addEventListener('click', incrementClickCount);

// let clickCount = 0;

// export function incrementClickCount() {

//   let stats = JSON.parse(localStorage.getItem('stats')) || {};

//   clickCount++;
//   localStorage.setItem('clickCount', clickCount);
//   console.log(clickCount);
// }

// //! FAILS ON MINIGAMES

// let fails = 0;

// export function failsOnMinigames(minigame) {
//   fails++;
//   localStorage.setItem(minigame, fails);
//   console.log(minigame, fails);
// }

// localStorage.clear();
