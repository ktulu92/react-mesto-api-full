export const BASE_URL = "https://api.ktulu92.students.nomoredomains.monster";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
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
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    else if (response.status === 401) {
      return Promise.reject(`Ошибка: ${response.status} - переданный токен некорректен`);
    }
  })
  .then(data => data.data)

};
