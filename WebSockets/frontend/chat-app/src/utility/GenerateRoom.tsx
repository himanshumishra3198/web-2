export function GenerateRoom() {
  const lookUp =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let temp = "";
  for (let i = 0; i < 15; i++) {
    temp += lookUp[Math.floor(Math.random() * lookUp.length)];
  }
  return temp;
}
