
const myInit = {
  headers: { 'X-Auth-Token': 'MY_API_KEY' },
  dataType: 'json',
  type: 'GET',
}

const fetchGames = () => {
  fetch('https://api.football-data.org/v2/teams/524/matches/', myInit)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
}

// const fetchTeam = (id) => {
//   fetch(`https://api.football-data.org/v2/teams/${id}`, myInit)
//     .then((response) => {
//       return response.json()
//     }).then((data) => {
//       console.log(data)
//     })
// }

// fetchGames();
