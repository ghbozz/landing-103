const teamsLogo = new Map
teamsLogo.set('Nîmes Olympique', "./assets/images/teams_logo/nime.svg");
teamsLogo.set('Stade Rennais FC 1901', "./assets/images/teams_logo/srfc.png");
teamsLogo.set('Toulouse FC', "./assets/images/teams_logo/tfc.svg");

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

// const fetchTeam = (id) => {
//   fetch(`https://api.football-data.org//v2/teams/${id}`, myInit)
//     .then(response => response.json())
//     .then(data => console.log(data))
// }

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
  let homeImg = ''
  let awayImg = ''
  if (match.awayTeam.name != "Paris Saint-Germain FC") {
    homeImg = './assets/images/logo.png'
    awayImg = teamsLogo.get(match.awayTeam.name)
  } else {
    homeImg = teamsLogo.get(match.homeTeam.name)
    awayImg = './assets/images/logo.png'
  }
  return `
    <div class="col-sm">
      <div class="game-card">
        <div class="top-card">

            <div class="home-team">
              <img id="home-img" src=${homeImg} alt="">
              <span class="home-team-name">${match.homeTeam.name}</span>
            </div>
            <div class="away-team">
              <img id="away-img" src=${awayImg} alt="">
              <span class="away-team-name">${match.awayTeam.name}</span>
            </div>

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
