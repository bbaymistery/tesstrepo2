import { fetchConfig } from "../resources/getEnvConfig";

export const getLanguages = async(par) => {
  const env = await fetchConfig(); // Fetch the env config
    
    const response = await fetch(`${env.apiDomain}/app/en`);
    const datas = await response.json();
    return datas
}