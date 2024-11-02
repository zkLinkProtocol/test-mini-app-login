export function checkInTelegramMiniApp() {
  return (
    window &&
    (window as any).Telegram &&
    (window as any).Telegram.WebApp.initDataUnsafe.user
  );
}

export function generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }