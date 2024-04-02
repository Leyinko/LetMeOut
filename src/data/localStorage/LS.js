// Collectables
export function addNoteToCollectables(item) {
  let collection = JSON.parse(localStorage.getItem('story')) || [];
  let note = item.match(/\d/)[0];

  !collection.includes(note) && collection.push(note);

  localStorage.setItem('story', JSON.stringify(collection));
}

export const getCollectables = () => JSON.parse(localStorage.getItem('story'));

// Game Data & Assign
export function storeGameData(data, player) {
  let start = {
    lobbyCode: data.lobbyCode,
    username: player,
    date: data.date,
    players: data.players,
    alternative: '❌',
  };
  localStorage.setItem('data', JSON.stringify(start));
  return true;
}

export function getUserData(property) {
  let data = JSON.parse(localStorage.getItem('data'));

  if (data) {
    let user = data.username;
    let player = data.players.find((player) => player.name.toLowerCase() == user.toLowerCase());

    return player[property];
  }
}

export function setAlternativeTrue() {
  let data = JSON.parse(localStorage.getItem('data'));
  data.alternative = true;
  localStorage.setItem('data', JSON.stringify(data));
}

// Stats
export let clickCount = {
  clicks: 0,
  games: [0, 0, 0],
};

export let timestamps = {
  stage1: 0,
  stage2: 0,
  stage3: 0,
  minigames: [0, 0, 0],
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
