import AsyncStorage from "@react-native-community/async-storage";

export async function CallAPI(strUrl, smethod, strBody) {
  let token = await ngetStorage(nkey.access_token, "");
  // console.log('token', token)
  try {
    const response = await fetch(strUrl, {
      method: smethod,
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: Bearer + token,
        TimeZone: new Date().getTimezoneOffset().toString(), // Này của phần JeeWork BE kêu bổ sung
      },
      body: strBody,
    });
    const res = StatusCode ? null : await response.json();
    logHeader == true ? console.log("=-=-=response", response) : null;
    const result = ReturnResponse(response.status, res);
    return result;
  } catch (error) {
    console.log("Lỗi error:", error);
    return -1;
  }
}

export async function CallAPIAuthentication(data, callback) {
  try {
    const response = await fetch(
      "http://172.17.15.45:8000/users/accounts/login/",
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
    console.debug("=-=res", res);
    callback(res);
  } catch (error) {
    console.log("Lỗi error:", error);
    callback(false);
  }
}
