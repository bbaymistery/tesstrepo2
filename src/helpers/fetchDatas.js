export const postDataAPI = async (params = {}) => {
    let { url, body } = params
    const method = "POST"
    const headers = { "Content-Type": "application/json", }
    const reqOpt = { body: JSON.stringify(body), method, headers }

    const response = await fetch(url, reqOpt);
    const datas = await response.json();

    return datas;
}

export const getDataApi = async (params = {}) => {
    let { url } = params
    const response = await fetch(url);
    const datas = await response.json();
    return datas
}