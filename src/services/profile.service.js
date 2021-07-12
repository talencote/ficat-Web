import { authToken } from '../helpers/auth-token'
import { authHeader } from '../helpers/auth-header'
import { userService } from './user.service'

export const profileService = {
  removeFavFandom,
  addFavFandom,
  getProfile
}

function removeFavFandom (fandom) {
  const id = Number(JSON.parse(localStorage.getItem('user')).id)

  var headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', authToken())

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ string: fandom, id })
  }

  return fetch(`api/profile/remove_favorite_fandom`, requestOptions)
    .then(data => {
      userService.getProfile(id)

      return data
    })
}

function addFavFandom (fandom) {
  const id = Number(JSON.parse(localStorage.getItem('user')).id)

  var headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', authToken())

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ string: fandom, id })
  }

  return fetch(`api/profile/add_favorite_fandom`, requestOptions)
    .then(data => {
      getProfile(id)

      return data
    })
}

function getProfile (id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  console.log('in getProfile')
  return fetch(`api/profile/${id}`, requestOptions)
    .then(
      userDetails => {
        console.log('before set item')
        localStorage.setItem('userDetails', JSON.stringify(userDetails))

        return userDetails
      }
    )
}
