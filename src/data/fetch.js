export async function fetchFinalCode() {
  // User Data
  let lobbyCode = JSON.parse(localStorage.getItem('data')).lobbyCode;
  let id = document.querySelector('.id').textContent;

  // LOCAL :
  // `http://localhost:3000/final-code?lobbyCode=${lobbyCode}&id=${encodeURIComponent(id)}`
  // SERVER :
  // `http://5.250.185.179:3000/final-code?lobbyCode=${lobbyCode}&id=${encodeURIComponent(id)}`

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

// NB : RANKING FETCH
