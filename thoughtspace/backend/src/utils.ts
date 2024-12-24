export const random = (len: number): String => {
  const key = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let hash = "";
  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * 62);
    hash += key[index];
  }
  return hash;
};
