import axios from 'axios'

export default async function fetchCharacters() {
  return (
    await axios.get('http://proxy.rconjoe.com:12120/https://giantbomb.com/api/characters/?api_key=161a437ab0f7b3a41b3859677505baea6a2e9827&format=json')
    .catch(err => {
      console.error(err)
    })
  ).data.results
}