export const BASE_URL = "https://api.ktulu92.students.nomoredomains.monster";


const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => handleResponse(res));
};

// const checkResponse = (response) => {  response.ok ? response.json() : Promise.reject("Ошибка на сервере");};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    // .then((response) => response.json())
    // .then((token) => {
    //   if (token) {
    //     localStorage.setItem("jwt", data.token);
    //     return data;
    //   }
    // })
    // .catch(err => console.log(err))
    .then((res) => handleResponse(res));
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => handleResponse(res));

   
};
