import { fetchConfig } from "../resources/getEnvConfig";

export async function checkPermit(params = {}) {
  const env = await fetchConfig();

  let { userId = "", xAuthToken = "" } = params;
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    var raw = JSON.stringify({
      "x-auth-token": xAuthToken,
      "user-id": userId,
      language: "en",
      resources: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${env.apiDomain}/check-permit`, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve({ ...result }))
      .catch((error) => resolve({ status: 403, error: [error, message] }));
  });
}
