export const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
  
export const capitalizeFirstLetterDevice = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};