export async function gameAccess(value) {
  try {
    let response = await fetch(`http://5.250.185.179:3000/access-game?pass=${value}`, {
      method: 'GET',
      headers: [['Content-Type', 'application/json']],
    });

    let data = await response.json();
    let access = data.access;
    return access;
  } catch (error) {
    console.error('Error fetching beta access', error);
  }
}

export async function fetchFinalCode() {
  // User Data
  let lobbyCode = JSON.parse(localStorage.getItem('data')).lobbyCode;
  let id = document.querySelector('.id').textContent;

  try {
    let response = await fetch(
      `http://5.250.185.179:3000/final-code?lobbyCode=${lobbyCode}&id=${encodeURIComponent(id)}`,
      {
        method: 'GET',
        headers: [['Content-Type', 'application/json']],
      }
    );
    if (!response.ok) {
      throw new Error('Error accessing DDBB');
    }
    let data = await response.json();
    let code = data.finalCode;
    return code;
  } catch (error) {
    console.error('Error fetching the final code', error);
  }
}

export async function sendScore() {
  let body = {
    lobbyCode: JSON.parse(localStorage.getItem('data')).lobbyCode,
  };
  try {
    let response = await fetch(`http://5.250.185.179:3000/save-ranking`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending Score to DDBB', error);
  }
}

export async function getRankings() {
  try {
    const response = await fetch('http://5.250.185.179:3000/get-ranking', {
      method: 'GET',
      headers: [['Content-Type', 'application/json']],
    });

    const data = await response.json();

    return data.ranking;
  } catch (err) {
    console.log('Error getting ranks', err);
  }
}
