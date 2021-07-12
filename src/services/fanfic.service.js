import { authToken } from '../helpers/auth-token'

export const fanficService = {
  getPopular
}

function getPopular () {
  var headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', authToken())

  const requestOptions = {
    method: 'GET',
    headers: headers,
    body: JSON.stringify()
  }

  fetch(`/api/fanfic/popular/1`, requestOptions)
    .then(resoponse => {
      return resoponse
      resoponse.json().then(data => {
        console.log(data)
        return data
      })
    })
}
