
const myInit = {
  headers: { 'X-Auth-Token': 'KEY' },
  dataType: 'json',
  type: 'GET',
}

const fetchGames = () => {
  fetch('https://api.football-data.org/v2/competitions/FL1/matches', myInit)
    .then(response => response.json())
    .then(data => buildCards(data))
}

const buildCards = (data) => {
  const results = new Array
  data.matches.forEach((match) => {
    if (filter(match)) {
      results.push(buildCard(match))
    }
  })
  injectCards(results.slice(0, 3).join(''))
}

const buildCard = (match) => {
  console.log(match)
  return `
    <div class="col-sm">
      <div class="game-card">
        <div class="top-card">
          <span class="home-team">${match.homeTeam.name}</span>
          <span class="away-team">${match.awayTeam.name}</span>
        </div>
        <div class="bottom-card">
          <span class="date">Thu, Jul 28 - 12:30 AM</span>
          <span class="buy">Buy Tickets</span>
          <span class="game-center">Game Center</span>
        </div>
      </div>
    </div>
  `
}

const injectCards = (html) => {
  const row = document.querySelector('.upcoming-row')
  row.innerHTML = html
}


const filter = (match) => {
  if (match.awayTeam.name === 'Paris Saint-Germain FC' || match.homeTeam.name === 'Paris Saint-Germain FC') {
    return true
  }
}

fetchGames();
