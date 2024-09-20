// utils/config.js

import { getEnvConfig } from "../resources/getEnvConfig";

export async function fetchConfig() {
  const configFetch = await fetch('https://env.london-tech.com/configration.json');
  const config = await configFetch.json();
  return getEnvConfig(config);
}
