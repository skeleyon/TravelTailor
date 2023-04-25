import axios from "axios";

class AuthService {
  login(email, password) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    // axios.post(`${process.env.REACT_APP_DOMAIN_URL}/auth/jwt/create/`, body, config)
    return axios
      .post(`http://localhost:8000/auth/jwt/create/`, body, config)
      .then((response) => {
        var payload = response.data;
        if (payload.access) {
          localStorage.setItem("access", payload.access);
          var loadRes = this.loadUser();
          loadRes.isAuthenticated = true;
          return loadRes;
        }
      });
  }

  loadUser() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      return axios
        .get(`http://localhost:8000/auth/users/me/`, config)
        .then((response) => {
          if (response.data) {
            return { user: response.data, type: "LOAD_USER_SUCCESS" };
          } else {
            return { type: "LOAD_USER_FAIL" };
          }
        });
    }
  }

  googleAuthenticate(state, code) {
    if (state && code && !localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const details = {
        state: state,
        code: code,
      };
      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");
      const res = axios.post(
        `http://localhost:8000/auth/o/google-oauth2/?${formBody}`,
        config
      );
      debugger;

      return res;
    }
  }

  checkAuthenticated() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({ token: localStorage.getItem("access") });

      return axios
        .post(`http://localhost:8000/auth/jwt/verify/`, body, config)
        .then((response) => {
          if (!response.data || response.data.code !== "token_not_valid")
            return true;
          else return false;
        });
    }
  }

  resetPassword(email) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.getCookie('csrftoken')
      },
    };
    const body = JSON.stringify({ email });
    const res = axios.post(
      `http://localhost:8000/auth/users/reset_password/`,
      body,
      config
    );
    return res
  }

  resetPasswordConfirm(uid, token, new_password, re_new_password) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.getCookie('csrftoken')
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    const res = axios.post(
      `http://localhost:8000/auth/users/reset_password_confirm/`,
      body,
      config
    );
    return res;
  }

  getCookie(name){
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  signup(name, email, password, re_password) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.getCookie('csrftoken')
      },
    };


    const body = JSON.stringify({ name, email, password, re_password });

    const res = axios.post(`http://localhost:8000/auth/users/`, body, config);

    return res;
  }

  verify(uid, token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.getCookie('csrftoken')
      },
    };

    const body = JSON.stringify({ uid, token });

    const res = axios.post(
      `http://localhost:8000/auth/users/activation/`,
      body,
      config
    );
    return res;
  }

  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
