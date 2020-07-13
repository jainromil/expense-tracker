import axios from "axios";
import { BASE_API_URL } from "./constants";

const API_URL = BASE_API_URL + "/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("email", JSON.stringify(email));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
  }

  register(firstName, lastName, email, password) {
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      email,
      password,
    });
  }

  isLoggedIn() {
    if (JSON.parse(localStorage.getItem("user")) === null) {
      return false;
    }

    return true;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("email"));
  }
}

export default new AuthService();
