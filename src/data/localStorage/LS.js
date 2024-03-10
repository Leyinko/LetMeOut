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

  if (data) {
    let user = data.username;
    let player = data.players.find((player) => player.name.toLowerCase() === user);

    return player.id.toUpperCase();
  }
}

// Error Stats
export let clickCount = {
  clicks: 0,
  games: [0, 0, 0],
};

export let timestamps = {
  stage1: '',
  stage2: '',
  stage3: '',
  minigames: ['', '', ''],
  finalPhase: '',
};

export let messages = {
  sent: 0,
  received: 0,
};

export function statsCollector(action, property, value = null, index = null) {
  let stats = JSON.parse(localStorage.getItem('stats')) || [];

  if (action === 'clickCount') {
    !index ? clickCount[property]++ : clickCount[property][parseInt(index)]++;
  } else if (action === 'timestamps') {
    !index ? (timestamps[property] = value) : (timestamps[property][parseInt(index)] = value);
  } else {
    messages[property]++;
  }

  // Updated
  stats = [clickCount, timestamps, messages];

  localStorage.setItem('stats', JSON.stringify(stats));
}

// export function failsOnMinigames(minigame) {
//   let stats = JSON.parse(localStorage.getItem('stats')) || {};

//   let fails = stats[minigame] ? stats[minigame] + 1 : 1;
//   stats[minigame] = fails;

//   localStorage.setItem('stats', JSON.stringify(stats));
// }

// ! CLEAR !
// localStorage.clear();
// ! CLEAR !
