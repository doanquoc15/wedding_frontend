export const shortName = (fullName: string) => {
  if (!fullName) return ;
  
  const nameArr = fullName.split(" ");
  if (nameArr.length <= 2) return fullName;
  else {
    const shortName = `${nameArr[0]}  ${nameArr[nameArr.length - 1]}`;
    return shortName;
  }
};