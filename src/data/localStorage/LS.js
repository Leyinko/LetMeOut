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
  let start = { lobbyCode: data.lobbyCode, players: data.players, username: player };
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
  stage1: '',
  stage2: '',
  stage3: '',
  minigames: ['', '', ''],
  total: '',
};

export function setTotalTime() {
  let totalTime = Object.values(JSON.parse(localStorage.getItem('stats'))[1])
    .flat(1)
    .reduce((acc, next) => acc + next);
  // Save
  statsCollector('timestamps', 'total', totalTime);
}

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

// TEST DATA
let MOCK_LS = [
  { clicks: '157', games: ['13', '2', '18'] },
  { stage1: '16', stage2: '78', stage3: '186', minigames: ['15', '40', '23'], total: '589' },
  {
    sent: '25',
    received: '26',
  },
  { alternative: true },
];

localStorage.setItem('mock', JSON.stringify(MOCK_LS));

// ! CLEAR !
// localStorage.clear();
// ! CLEAR !
