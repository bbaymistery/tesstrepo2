export const substrText = (string) => {
  let newText = "";
  if (string?.length > 34) {
    newText = `${string.substring(0, 32)} ..`;
  } else {
    newText = string;
  }

  return newText;
};
