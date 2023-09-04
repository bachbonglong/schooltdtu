import AsyncStorage from "@react-native-community/async-storage";

const domain = "0.0.0.0";

export async function CallAPIAuthentication(data, callback) {
  console.debug("=-=data", data);
  try {
    const response = await fetch(
      `http://${domain}:8000/users/accounts/login/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    callback(res);
  } catch (error) {
    callback(false);
  }
}

export async function CallAPIInfo(data, callback) {
  console.debug("=-=data", data);
  try {
    const response = await fetch(`http://${domain}:8000/advise/data/${data}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    callback(res);
  } catch (error) {
    callback(false);
  }
}

export async function CallNewAPI(token, url, data, method, callback) {
  if (data) {
    try {
      const response = await fetch(`http://${domain}:8000/${url}`, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      callback(res);
    } catch (error) {
      callback(false);
    }
  } else {
    try {
      const response = await fetch(`http://${domain}:8000/${url}`, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      callback(res);
    } catch (error) {
      callback(false);
    }
  }
}
