import { authHeader } from '../helpers/auth-header'

const API_URL = 'http://localhost:8081/api/'

export const userService = {
  login,
  registration,
  logout,
  getAll
}

function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return fetch(`api/auth/signin`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.accessToken) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))

        getProfile(user.id)
      }

      return user
    })
}

function getProfile (id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`api/profile/${id}`, requestOptions)
    .then(handleResponse)
    .then(
      userDetails => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails))

        return userDetails
      }
    )
}

function registration (username, email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  }

  return fetch(`api/auth/signup`, requestOptions)
    .then(handleResponse)
    .then(
      data => {
        return data
      })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
  localStorage.removeItem('userDetails')
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${API_URL}/users`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
