import env from "../resources/env";

export const getLanguages = async(par) => {
    const response = await fetch(`${env.apiDomain}/app/en`);
    const datas = await response.json();
    return datas
}